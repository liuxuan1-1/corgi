import { Service } from 'egg';
import { IResponseBody } from '../../typings';

/**
 * template Service
 */
export default class TemplateService extends Service {
  /**
   * 获取模板列表
   */
  public async list(category: string): Promise<IResponseBody> {
    const { ctx } = this;
    try {
      const result = await ctx.app.mongo.find('template', {
        query: {
          category,
        },
        sort: {
          _id: -1,
        },
      });
      return {
        success: true,
        message: '调用成功',
        data: {
          list: result,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `调用失败: ${JSON.stringify(error)}`,
        data: {},
      };
    }

  }
}
