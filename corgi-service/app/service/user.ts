import { Service } from 'egg';
import { IResponseBody } from '../../typings';

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
}
