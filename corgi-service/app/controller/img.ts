import { Controller } from 'egg';

export default class ImgController extends Controller {
  public async uploadAvatar() {
    const { ctx } = this;
    ctx.body = await ctx.service.upload.upload('app/public/img/user/avatar', 'avatar');
  }

  public async uploadFace() {
    const { ctx } = this;
    const result = await ctx.service.upload.upload('app/public/img/user/face', 'face');
    const faceOk = await ctx.service.face.computed(result.data.file);
    if (faceOk) {
      ctx.body = result;
    } else {
      await ctx.service.upload.deleteUrl(result.data.file);
      ctx.body = {
        success: false,
        message: '人脸识别度太低',
        data: {},
      };
    }
  }

  public async uploadMaterial() {
    const { ctx } = this;
    ctx.body = await ctx.service.upload.upload('app/public/img/material', 'material');
  }

  public async uploadCoverUrl() {
    const { ctx } = this;
    ctx.body = await ctx.service.upload.upload('app/public/img/cover', 'cover');
  }

  public async delete() {
    const { ctx } = this;
    const param: string = ctx.request.query.id;
    ctx.body = await ctx.service.upload.delete(param);
  }

  public async getMaterial() {
    const { ctx } = this;
    ctx.body = await ctx.service.upload.getImgList('material');
  }

}
