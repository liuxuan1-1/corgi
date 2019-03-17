import { Controller } from 'egg';

export default class ImgController extends Controller {
  public async uploadAvatar() {
    const { ctx } = this;
    ctx.body = await ctx.service.upload.upload('app/public/img/user/avatar', 'avatar');
  }

  public async uploadFace() {
    const { ctx } = this;
    ctx.body = await ctx.service.upload.upload('app/public/img/user/face', 'face');
  }

  public async uploadMaterial() {
    const { ctx } = this;
    ctx.body = await ctx.service.upload.upload('app/public/material', 'material');
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
