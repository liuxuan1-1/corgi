import { Controller } from 'egg';
import ms = require('ms');
import { IResponseBody } from '../../typings';

export default class AccountController extends Controller {
  public async login() {
    const { ctx } = this;
    // ctx.request.query get请求
    const param = ctx.request.body;

    const result: IResponseBody = await ctx.service.user.login(param.accountId, param.password);
    if (result.success) {
      ctx.session.corgi_userId = result.data.userInfo._id;
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

  public async update() {
    const { ctx } = this;
    const param = ctx.request.body;
    const result = await ctx.service.user.update(param);
    ctx.body = result;
  }

  public async openface() {
    const { ctx } = this;
    const param = ctx.request.body;
    const result = await ctx.service.user.openface(param.open);
    ctx.body = result;
  }

  public exit() {
    const { ctx } = this;
    ctx.session.maxAge = -1;
    ctx.body = {
      success: true,
      message: '退出成功',
      data: {},
    };
  }

  public async getUserInfo() {
    const { ctx } = this;
    const userInfo = await ctx.service.user.getUserInfo();
    let result: IResponseBody;
    if (Array.isArray(userInfo) && userInfo.length !== 0) {
      delete userInfo[0].password;
      result = {
        success: true,
        message: '调用成功',
        data: {
          userInfo: userInfo[0],
        },
      };
    } else {
      result = {
        success: false,
        message: '用户名不存在',
        data: {},
      };
    }
    ctx.body = result;
  }
}
