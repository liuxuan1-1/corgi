import { Controller } from 'egg';
import ms = require('ms');
import { IResponseBody } from '../../typings';

export default class AccountController extends Controller {
  public async login() {
    const { ctx } = this;
    // ctx.request.query get请求
    const param = ctx.request.body;

    const result: IResponseBody = await ctx.service.user.login(param.accountId, param.password);
    if (result.data.ok) {
      ctx.session.corgi_userId = result.data.id;
      // 如果选择了'记住我', session失效期设为30天
      if (param.remember) { ctx.session.maxAge = ms('30d'); }
    }
    ctx.body = result;
  }

  public async sign() {
    const { ctx } = this;
    const param = ctx.request.body;
    const result: IResponseBody = await ctx.service.user.sign(param);
    ctx.body = result;
  }
}
