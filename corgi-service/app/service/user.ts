import { Service } from 'egg';
// egg-mongo的依赖
// tslint:disable-next-line: no-implicit-dependencies
import { ObjectId } from 'mongodb';
import ms = require('ms');

import { IResponseBody } from '../../typings';
import { IUserDocument } from '../../typings/mongo';

/**
 * User Service
 */
export default class User extends Service {

  /**
   * login check
   * @param accountId => 账号
   * @param password => 密码
   */
  public async login(accountId: string, password: string): Promise<IResponseBody> {
    const { ctx } = this;
    const userInfo = await ctx.app.mongo.find('user', {
      query: {
        accountId,
      },
    });
    if (Array.isArray(userInfo) && userInfo.length === 0) {
      return {
        success: false,
        message: '用户名错误',
        data: {},
      };
    }

    if (userInfo[0] && userInfo[0].password === password) {
      return {
        success: true,
        message: '登录成功',
        data: {
          userInfo: userInfo[0],
        },
      };
    } else if (userInfo[0] && userInfo[0].password !== password) {
      return {
        success: false,
        message: '密码错误',
        data: {
        },
      };
    }

    return {
      success: false,
      message: '未知错误',
      data: {},
    };
  }

  /**
   * registered user
   * @param param => 见下面doc参数
   */
  public async sign(param): Promise<IResponseBody> {

    const { ctx } = this;
    const doc: IUserDocument = {
      nickName: param.nickName,
      avatarUrl: param.avatarUrl,
      phoneNum: param.phoneNum,
      faceUrl: '',
      faceOpen: false,
      permission: 'generalUser',
      accountId: param.accountId,
      password: param.password,
    };

    const userInfo = await ctx.app.mongo.find('user', {
      query: {
        accountId: doc.accountId,
      },
    });
    if (Array.isArray(userInfo) && userInfo.length !== 0) {
      return {
        success: false,
        message: '用户名存在',
        data: {
          hasUser: true,
        },
      };
    }

    try {
      const result = await ctx.app.mongo.insertOne('user', {
        doc,
      });
      if (result.result.ok === 1) {
        ctx.session.corgi_userId = result.ops[0]._id;
        ctx.session.maxAge = ms('30d');
        return {
          success: true,
          message: `注册成功`,
          data: {
            userInfo: result.ops[0],
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

  public async update(param) {
    const { ctx } = this;
    try {
      const result = await ctx.app.mongo.updateMany('user', {
        filter: {
          _id: new ObjectId(ctx.session.corgi_userId),
        },
        update: {
          $set: {
            accountId: param.accountId,
            avatarUrl: param.avatarUrl,
            faceUrl: param.faceUrl,
            nickName: param.nickName,
            phoneNum: param.phoneNum,
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

  public async openface(faceOpen: boolean) {
    const { ctx } = this;
    try {
      const userInfo = await ctx.app.mongo.find('user', {
        query: {
          _id: new ObjectId(ctx.session.corgi_userId),
        },
      });
      // console.log(userInfo);
      if (Array.isArray(userInfo) && userInfo.length !== 0) {
        if (!!!userInfo[0].faceDescriptor) {
          return {
            success: false,
            message: '没找到人脸匹配图像',
            data: {},
          };
        }
      }

      const result = await ctx.app.mongo.updateMany('user', {
        filter: {
          _id: new ObjectId(ctx.session.corgi_userId),
        },
        update: {
          $set: {
            faceOpen,
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
   * 获取用户信息
   */
  public async getUserInfo() {
    const { ctx } = this;
    const userInfo = await ctx.app.mongo.find('user', {
      query: {
        _id: new ObjectId(ctx.session.corgi_userId),
      },
    });
    return userInfo;
  }
}
