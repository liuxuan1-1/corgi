import { Controller } from 'egg';

export default class AccountController extends Controller {
  public async login() {
    const { ctx } = this;
    console.log(ctx.request.body);
    // ctx.request.query get请求
    ctx.body = await ctx.service.test.sayHi('egg');
    const caonima = await ctx.app.mongo.find('template', {
      query: {},
    });
    console.log(111, caonima);
    // 获取数据库;
  }
}
