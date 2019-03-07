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
    ctx.body = {
      success: true,
      message: 'caonima',
      data: {
        fileName: '123',
        info: {
          element: [{
            css: {
              border: 0,
              top: 0,
            },
            id: 0,
            type: 'font',
          }],
          root: {
            css: {
              background: '#f1f1f2',
              height: '1008px',
              width: '640px',
            },
            size: '640*1008',
          },
        },
      },
    };
  }

  public async create() {
    const { ctx } = this;
    // ctx.request.query get请求
    const result: IResponseBody = await ctx.service.template.create();
    ctx.body = result;
  }

  public async delete() {
    const { ctx } = this;
    // ctx.request.query get请求
    const param = ctx.request.query.id;
    const result: IResponseBody = await ctx.service.template.delete(param);
    ctx.body = result;
  }
}
