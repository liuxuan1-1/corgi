// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)
import '@tensorflow/tfjs-node';
import { Service } from 'egg';

// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
import * as canvas from 'canvas';

import * as faceapi from 'face-api.js';

// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement, additionally an implementation
// of ImageData is required, in case you want to use the MTCNN
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// egg-mongo的依赖
// tslint:disable-next-line: no-implicit-dependencies
import { ObjectId } from 'mongodb';

// import { IResponseBody } from '../../typings';
// import { IImgDocument } from '../../typings/mongo';

/**
 * Face Service
 */
export default class Face extends Service {

  /**
   * 提取出面部mark点
   * @param filePath => 文件路径
   */
  public async computed(url: string): Promise<boolean> {
    const { ctx } = this;
    await faceapi.nets.tinyFaceDetector.loadFromDisk('./app/public/weights');
    await faceapi.nets.faceLandmark68Net.loadFromDisk('./app/public/weights');
    await faceapi.nets.faceRecognitionNet.loadFromDisk('./app/public/weights');
    const img = await canvas.loadImage(`http://127.0.0.1:7001/${encodeURI(url)}`);
    const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 });

    const detections = await faceapi.detectSingleFace(img, options).withFaceLandmarks().withFaceDescriptor();
    if (detections) {
      // detections.descriptor
      if (detections.detection.score < 0.5) {
        return false;
      }
      const result = await ctx.app.mongo.updateMany('user', {
        filter: {
          _id: new ObjectId(ctx.session.corgi_userId),
        },
        update: {
          $set: {
            faceDescriptor: detections.descriptor,
            faceUrl: url,
          },
        },
      });
      if (result.result.ok === 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

}
