import { Service } from 'egg';
// egg-mongo的依赖
// tslint:disable-next-line: no-implicit-dependencies
import { ObjectId } from 'mongodb';
import { IResponseBody } from '../../typings';
import { IDesignDocument } from '../../typings/mongo';

async function checkPermission(ctx: any, _id: string): Promise<boolean> {
  const createUserId = await ctx.app.mongo.find('design', {
    query: {
      _id: new ObjectId(_id),
    },
    projection: {
      createUserId: true,
    },
  });

  if (Array.isArray(createUserId) && createUserId.length !== 0) {
    if (!createUserId[0].createUserId.equals(ctx.session.corgi_userId)) {
      return false;
    }
  } else {
    return false;
  }
  return true;
}

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
   * @param _id 删除文件id
   */
  public async delete(_id: string): Promise<IResponseBody> {
    const { ctx } = this;
    try {
      if (!await checkPermission(ctx, _id)) {
        return {
          success: false,
          message: '无权操作',
          data: {},
        };
      }

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

  /**
   * 创建文件
   * @param templateId 创建文件的templateId
   */
  public async create(templateId: string): Promise<IResponseBody> {
    const { ctx } = this;
    const doc: IDesignDocument = {
      templateId: new ObjectId(templateId),
      createUserId: new ObjectId(ctx.session.corgi_userId),
      info: '{}',
      coverUrl: '',
      designName: '未命名',
    };

    try {
      const result = await ctx.app.mongo.insertOne('design', {
        doc,
      });
      if (result.result.ok === 1) {
        return {
          success: true,
          message: `创建成功`,
          data: {
            designInfo: result.ops[0],
          },
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `数据库插入错误: ${error}`,
        data: {},
      };
    }

    return {
      success: false,
      message: '未知错误',
      data: {},
    };
  }
}
