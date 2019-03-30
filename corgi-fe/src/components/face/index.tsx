import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as faceapi from 'face-api.js';

// import axios from 'axios';
import { API_URL } from '../../pagesConst';
import './index.scss';

function resizeCanvasAndResults(dimensions: any, canvas: any, results: any) {
  const { width, height } = dimensions instanceof HTMLVideoElement
    ? faceapi.getMediaDimensions(dimensions)
    : dimensions
  canvas.width = width
  canvas.height = height

  // resize detections (and landmarks) in case displayed image is smaller than
  // original size
  return faceapi.resizeResults(results, { width, height })
}

function drawLandmarks(dimensions: any, canvas: any, results: any, withBoxes = true) {
  const resizedResults = resizeCanvasAndResults(dimensions, canvas, results)

  if (withBoxes) {
    faceapi.drawDetection(canvas, resizedResults.map((det: any) => det.detection))
  }

  const faceLandmarks = resizedResults.map((det: any) => det.landmarks)
  const drawLandmarksOptions = {
    color: 'green',
    drawLines: true,
    lineWidth: 2,
  }
  faceapi.drawLandmarks(canvas, faceLandmarks, drawLandmarksOptions)
}

let options: any;
let stream: MediaStream;

interface Istates {
}

@inject('store')
@observer
class Face extends React.Component<any, Istates> {
  public static startFace = async () => {
    await faceapi.loadTinyFaceDetectorModel(`${API_URL}/corgi/public/weights/`)
    await faceapi.loadFaceLandmarkModel(`${API_URL}/corgi/public/weights/`)
    await faceapi.loadFaceRecognitionModel(`${API_URL}/corgi/public/weights/`)
    stream = await navigator.mediaDevices.getUserMedia({ video: {} })
    const faceVideo: HTMLVideoElement = document.getElementById('faceVideo') as HTMLVideoElement;
    if (faceVideo) {
      faceVideo.srcObject = stream;
    }
    options = new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
  }
  public readonly state: Readonly<Istates> = {
  }

  constructor(props: any) {
    super(props);
  }

  public componentWillUnmount() {
    // 关闭视频流
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  }

  public handleVideoPlay = async (): Promise<any> => {
    const faceVideo: HTMLVideoElement = document.getElementById('faceVideo') as HTMLVideoElement;
    const canvasEl: HTMLCanvasElement = document.getElementById('overlay') as HTMLCanvasElement;
    // if (faceVideo.paused || faceVideo.ended || !faceapi.nets.tinyFaceDetector.params) {
    //   return setTimeout(() => this.handleVideoPlay())
    // }

    if (this.props.store.userInfo.success) {
      const { faceDescriptor } = this.props.store.userInfo.data;

      const result = await faceapi.detectSingleFace(faceVideo, options).withFaceLandmarks().withFaceDescriptor()

      if (result) {
        const faceMatcher = new faceapi.FaceMatcher(result)
        drawLandmarks(faceVideo, canvasEl, [result], true)

        if (faceDescriptor) {

          const bestMatch = faceMatcher.findBestMatch(Float32Array.from(Object.values(faceDescriptor)))
          if (bestMatch.distance < 0.4) {
            this.props.store.setFaceCheck(true)
          } else {
            setTimeout(() => this.handleVideoPlay())
          }

        } else {
          setTimeout(() => this.handleVideoPlay())
        }
      } else {
        setTimeout(() => this.handleVideoPlay())
      }
    } else {
      setTimeout(() => this.handleVideoPlay())
    }
  }


  public render() {
    return (
      <div className="face-wrapper" >
        <video id="faceVideo" onPlay={this.handleVideoPlay} autoPlay={true} muted={true} />
        <canvas id="overlay" />
      </div>
    );
  }
}

export default Face;
