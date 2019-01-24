import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    console.log(ctx.request.query)
    // ctx.request.query get请求
    
    ctx.body = await ctx.service.test.sayHi('egg');
  }
}
