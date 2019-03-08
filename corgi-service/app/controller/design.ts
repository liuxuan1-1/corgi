import { Controller } from 'egg';
import { IResponseBody } from '../../typings';

export default class DesignController extends Controller {
  public async getList() {
    const { ctx } = this;
    // ctx.request.query get 请求
    // ctx.request.body post 请求
    const result: IResponseBody = await ctx.service.design.list();
    ctx.body = result;
  }

  public async getFile() {
    const { ctx } = this;
    const param: string = ctx.request.query.id;
    const result: IResponseBody = await ctx.service.design.getFile(param);
    ctx.body = result;
  }

  public async delete() {
    const { ctx } = this;
    const param = ctx.request.query.id;
    const result: IResponseBody = await ctx.service.design.delete(param);
    ctx.body = result;
  }

  public async create() {
    const { ctx } = this;
    const param = ctx.request.query.templateid;
    const result: IResponseBody = await ctx.service.design.create(param);
    ctx.body = result;
  }

  public async save() {
    const { ctx } = this;
    // ctx.request.query get请求
    const param = ctx.request.body;
    const result: IResponseBody = await ctx.service.design.save(param);
    ctx.body = result;
  }
}
