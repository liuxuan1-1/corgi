import { Service } from 'egg';
// egg-mongo的依赖
// tslint:disable-next-line: no-implicit-dependencies
import { ObjectId } from 'mongodb';

import fs = require('fs');
import pump = require('mz-modules/pump');
import path = require('path');
import { IResponseBody } from '../../typings';
import { IImgDocument } from '../../typings/mongo';

/**
 * Upload Service
 */
export default class Upload extends Service {
  public async uploadCheck(coverId: {type: string, id: string}): Promise<boolean> {
    const { ctx } = this;
    if (!coverId.id) { return false; }
    try {
      // 取出对应表里的数据
      const imgTarget = await ctx.app.mongo.find(coverId.type, {
        query: {
          _id: new ObjectId(coverId.id),
        },
      });
      if (Array.isArray(imgTarget) && imgTarget.length !== 0) {
        if (!imgTarget[0].createUserId.equals(ctx.session.corgi_userId)) {
          return false;
        }
      } else {
        return false;
      }
      const filePath = imgTarget[0].coverUrl.replace(/^(corgi)\//, () => {
        return 'app/';
      }).split('/').join('\\');
      const allPath = path.join(
        this.config.baseDir,
        filePath,
      );

      if (fs.statSync(allPath).isFile) {
        // fs.unlinkSync(allPath); 因为文件名相同, 原有文件被覆盖掉, 此处不必删除
        // 删除文档数据
        await ctx.app.mongo.db.collection('img').deleteOne({
          url: imgTarget[0].coverUrl,
        });
      }
    } catch {
      return false;
    }

    return true;
  }

  /**
   * upload file
   * @param filePath => 文件路径
   */
  public async upload(filePath: string, type: string): Promise<IResponseBody> {
    const { ctx } = this;
    const parts = ctx.multipart({ autoFields: true });
    const files: any[] = [];

    const coverId = {
      type: '',
      id: '',
    };
    try {
      let stream = await parts();

      if (type === 'cover') {
        if (parts.field.designId) {
          coverId.type = 'design';
          coverId.id = parts.field.designId;
        } else if (parts.field.templateId) {
          coverId.type = 'template';
          coverId.id = parts.field.templateId;
        }
        if (!this.uploadCheck(coverId)) {
          return {
            success: false,
            message: `上传检查出现错误`,
            data: {},
          };
        }
      }

      // 文件url
      const fileList: string[] = [];
      while (stream != null) {
        let filename: string = `${new Date().getTime()}-${stream.filename.toLowerCase()}`;
        if (type === 'cover') {
          filename = `${coverId.id}.png`;
        }
        const target = path.join(
          this.config.baseDir,
          filePath,
          filename,
        );

        // url path 和 file path 不同
        const urlPath: string = filePath.replace(/^(app)\//, () => {
          return 'corgi/';
        });

        fileList.push(
          path.join(urlPath, filename),
        );
        const writeStream = fs.createWriteStream(target);
        await pump(stream, writeStream);
        files.push(filename);
        stream = await parts();
      }
      const imgDocument: IImgDocument = {
        url: fileList[0].split('\\').join('/'),
        type,
        userId: new ObjectId(ctx.session.corgi_userId),
      };
      ctx.app.mongo.insertOne('img', {
        doc: imgDocument,
      });
      return {
        success: true,
        message: '上传成功',
        data: {
          file: imgDocument.url,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `上传失败: ${error}`,
        data: {},
      };
    }
  }

  public async delete(id: string): Promise<IResponseBody> {
    const { ctx } = this;
    const imgTarget = await ctx.app.mongo.find('img', {
      query: {
        _id: new ObjectId(id),
      },
    });
    if (Array.isArray(imgTarget) && imgTarget.length !== 0) {
      if (!imgTarget[0].userId.equals(ctx.session.corgi_userId)) {
        return {
          success: false,
          message: '无权操作',
          data: {},
        };
      }
    } else {
      return {
        success: false,
        message: '无权操作',
        data: {},
      };
    }
    try {
      const filePath = imgTarget[0].url.replace(/^(corgi)\//, () => {
        return 'app/';
      }).split('/').join('\\');
      fs.unlinkSync(path.join(
        this.config.baseDir,
        filePath,
      ));
    } catch (err) {
      // 处理错误
      return {
        success: false,
        message: `删除文件失败: ${JSON.stringify(err)}`,
        data: {},
      };
    }

    try {
      const result = await ctx.app.mongo.db.collection('img').deleteOne({
        _id: new ObjectId(id),
      });
      if (result.result.ok === 1) {
        return {
          success: true,
          message: '删除成功',
          data: {},
        };
      }
    } catch (err) {
      return {
        success: false,
        message: `删除数据库记录失败: ${JSON.stringify(err)}`,
        data: {},
      };
    }
    return {
      success: false,
      message: `未知错误`,
      data: {},
    };
  }

  public async getImgList(type: string): Promise<IResponseBody> {
    const { ctx } = this;
    try {
      const imgTarget = await ctx.app.mongo.find('img', {
        query: {
          userId: new ObjectId(ctx.session.corgi_userId),
          type,
        },
        projection: {
          userId: false,
        },
      });
      return {
        success: true,
        message: '调用成功',
        data: {
          list: imgTarget,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `调用失败: ${JSON.stringify(error)}`,
        data: {},
      };
    }

  }
}
