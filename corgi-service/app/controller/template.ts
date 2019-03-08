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

  public async getMine() {
    const { ctx } = this;
    // ctx.request.query get请求
    const result: IResponseBody = await ctx.service.template.getMine();
    ctx.body = result;
  }

  public async getFile() {
    const { ctx } = this;
    const param: string = ctx.request.query.id;
    const result: IResponseBody = await ctx.service.template.getFile(param);
    result.data.fileName = result.data.templateName;
    delete result.data.templateName;
    ctx.body = result;
  }

  public async create() {
    const { ctx } = this;
    // ctx.request.query get请求
    const result: IResponseBody = await ctx.service.template.create();
    ctx.body = result;
  }

  public async save() {
    const { ctx } = this;
    // ctx.request.query get请求
    const param = ctx.request.body;
    const result: IResponseBody = await ctx.service.template.save(param);
    ctx.body = result;
  }

  public async delete() {
    const { ctx } = this;
    // ctx.request.query get请求
    const param = ctx.request.query.id;
    const result: IResponseBody = await ctx.service.template.delete(param);
    ctx.body = result;
  }

  public async release() {
    const { ctx } = this;
    // ctx.request.query get请求
    const param = ctx.request.body;
    const result: IResponseBody = await ctx.service.template.release(param.id, param.isRelease);
    ctx.body = result;
  }

}
