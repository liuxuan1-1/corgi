import { Service } from 'egg';
// egg-mongo的依赖
// tslint:disable-next-line: no-implicit-dependencies
import { ObjectId } from 'mongodb';
import { IResponseBody } from '../../typings';

/**
 * design Service
 */
export default class DesignService extends Service {
  /**
   * 获取我的列表
   */
  public async list(): Promise<IResponseBody> {
    const { ctx } = this;
    try {
      const result = await ctx.app.mongo.find('design', {
        query: {
          createUserId: new ObjectId(ctx.session.corgi_userId),
        },
        projection: {
          info: false,
          createUserId: false,
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

  /**
   * 删除我的文件
   */
  public async delete(_id: string): Promise<IResponseBody> {
    const { ctx } = this;
    try {
      const result = await ctx.app.mongo.db.collection('design').deleteOne({
          _id: new ObjectId(_id),
      });
      if (result.result.ok === 1) {
        return {
          success: true,
          message: '删除成功',
          data: {},
        };
      } else {
        return {
          success: false,
          message: '删除失败',
          data: {},
        };
      }

    } catch (error) {
      return {
        success: false,
        message: `删除失败: ${JSON.stringify(error)}`,
        data: {},
      };
    }
  }
}
