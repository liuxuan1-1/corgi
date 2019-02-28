import { Controller } from 'egg';

export default class ImgController extends Controller {
  public async uploadAvatar() {
    const { ctx } = this;
    ctx.body = await ctx.service.upload.upload('app/public/img/user/avatar');
  }
}
