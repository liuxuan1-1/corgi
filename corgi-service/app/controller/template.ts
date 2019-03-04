import { Controller } from 'egg';
import { IResponseBody } from '../../typings';

export default class TemplateController extends Controller {
  public async getList() {
    const { ctx } = this;
    // ctx.request.query get请求
    const params = ctx.request.query.category || '精选';
    const result: IResponseBody = await ctx.service.template.list(params);
    ctx.body = result;
  }

}
