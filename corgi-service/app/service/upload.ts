import { Service } from 'egg';
import fs = require('fs');
import pump = require('mz-modules/pump');
import path = require('path');
import { IResponseBody } from '../../typings';

/**
 * Upload Service
 */
export default class Upload extends Service {
  /**
   * upload file
   * @param filePath => 文件路径
   */
  public async upload(filePath: string): Promise<IResponseBody> {
    const { ctx } = this;
    const parts = ctx.multipart({ autoFields: true });
    const files: any[] = [];

    try {
      let stream = await parts();

      // 文件url
      const fileList: string[] = [];
      while (stream != null) {
        const filename = stream.filename.toLowerCase();
        const target = path.join(
          this.config.baseDir,
          filePath,
          `${new Date().getTime()}-${filename}`,
        );
        fileList.push(
          path.join(filePath,
          `${new Date().getTime()}-${filename}`),
        );
        const writeStream = fs.createWriteStream(target);
        await pump(stream, writeStream);
        files.push(filename);
        stream = await parts();
      }
      return {
        success: true,
        message: '上传成功',
        data: {
          file: fileList,
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
}
