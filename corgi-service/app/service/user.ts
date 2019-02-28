import { Service } from 'egg';
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
        success: true,
        message: '用户名错误',
        data: {
          ok: false,
        },
      };
    }

    if (userInfo[0] && userInfo[0].password === password) {
      return {
        success: true,
        message: '登录成功',
        data: {
          id: userInfo[0]._id,
          ok: true,
        },
      };
    } else if (userInfo[0] && userInfo[0].password !== password) {
      return {
        success: true,
        message: '密码错误',
        data: {
          ok: false,
        },
      };
    }

    return {
      success: true,
      message: '未知错误',
      data: {
        ok: false,
      },
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
        success: true,
        message: '用户名存在',
        data: {
          ok: false,
          hasUser: true,
        },
      };
    }

    try {
      const result = await ctx.app.mongo.insertOne('user', {
        doc,
      });
      if (result.result.ok === 1) {
        return {
          success: true,
          message: `注册成功`,
          data: {
            ok: true,
          },
        };
      }
    } catch (error) {
      return {
        success: true,
        message: `数据库插入错误: ${error}`,
        data: {
          ok: false,
        },
      };
    }

    return {
      success: true,
      message: '未知错误',
      data: {
        ok: false,
      },
    };
  }
}
