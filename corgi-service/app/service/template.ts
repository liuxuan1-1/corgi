import { Service } from 'egg';
// egg-mongo的依赖
// tslint:disable-next-line: no-implicit-dependencies
import { ObjectId } from 'mongodb';
import { IResponseBody } from '../../typings';

import { IFileInfo, ITemplateDocument, ITemplateSaveParam } from '../../typings/mongo';

/**
 * 检查该操作创建者是否和当前session用户一致
 * @param ctx egg ctx
 * @param _id template id
 */
async function checkPermission(ctx: any, _id: string): Promise<boolean> {
  const createUserId = await ctx.app.mongo.find('template', {
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
 * template Service
 */
export default class TemplateService extends Service {
  /**
   * 获取模板列表
   * @param category: 提取模板类型
   */
  public async list(category: string): Promise<IResponseBody> {
    const { ctx } = this;
    try {
      const result = await ctx.app.mongo.find('template', {
        query: {
          category,
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
   * 查找我制作的模板
   */
  public async getMine(): Promise<IResponseBody> {
    const { ctx } = this;
    try {
      const result = await ctx.app.mongo.find('template', {
        query: {
          createUserId: new ObjectId(ctx.session.corgi_userId),
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
   * 获取文件数据
   * @param _id template id
   */
  public async getFile(_id: string): Promise<IResponseBody> {
    const { ctx } = this;
    try {
      const result = await ctx.app.mongo.find('template', {
        query: {
          _id: new ObjectId(_id),
        },
      });
      if (Array.isArray(result) && result.length !== 0) {
        if (!result[0].createUserId.equals(ctx.session.corgi_userId)) {
          return {
            success: false,
            message: '无权操作',
            data: {},
          };
        } else {
          return {
            success: true,
            message: '调用成功',
            data: {
              ...result[0],
            },
          };
        }
      } else {
        return {
          success: false,
          message: '未查找到该文件数据',
          data: {},
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `获取数据失败: ${JSON.stringify(error)}`,
        data: {},
      };
    }
  }

  /**
   * 创造模板
   */
  public async create(): Promise<IResponseBody> {

    const { ctx } = this;
    const info: IFileInfo = {
      element: [{}],
      root: {
        css: {
          background: '#f1f1f2',
          height: '1008px',
          width: '640px',
        },
        size: '640*1008',
      },
    };
    const doc: ITemplateDocument = {
      createUserId: new ObjectId(ctx.session.corgi_userId),
      userCount: 0,
      category: ['精选'],
      coverUrl: '',
      info,
      templateName: '未命名',
    };

    const userInfo = await ctx.app.mongo.find('user', {
      query: {
        _id: new ObjectId(ctx.session.corgi_userId),
      },
      projection: {
        info: false,
        createUserId: false,
      },
    });
    if (Array.isArray(userInfo) && userInfo.length !== 0) {
      const permission = userInfo[0].permission;
      if (permission !== 'professional') {
        return {
          success: false,
          message: '没有权限',
          data: {},
        };
      }
    } else {
      return {
        success: false,
        message: '用户名不存在',
        data: {},
      };
    }

    try {
      const result = await ctx.app.mongo.insertOne('template', {
        doc,
      });
      if (result.result.ok === 1) {

        return {
          success: true,
          message: `创建成功`,
          data: {
            id: result.ops[0]._id,
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

  /**
   * 保存模板数据
   */
  public async save(data: ITemplateSaveParam): Promise<IResponseBody> {
    const { ctx } = this;
    try {
      if (!await checkPermission(ctx, data.id)) {
        return {
          success: false,
          message: '无权操作',
          data: {},
        };
      }
      const result = await ctx.app.mongo.updateMany('template', {
        filter: {
          _id: new ObjectId(data.id),
        },
        update: {
          $set: {
            info: data.info,
            templateName: data.fileName,
            category: data.category,
          },
        },
      });
      if (result.result.ok === 1) {
        return {
          success: true,
          message: `修改成功`,
          data: {
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

  /**
   * 删除我的模板文件
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

      const result = await ctx.app.mongo.db.collection('template').deleteOne({
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
