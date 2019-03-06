import { ObjectId } from 'mongodb';

/**
 * info json数据结构
 * {
 *  size: 640*1008,
 *  data: {
 *    element: [{
 *      id: number,
 *      type: 'font'
 *      css: {
 *        top: 0,
 *        border: 0,
 *      }
 *    }]
 *  }
 * }
 */

export interface IUserDocument {
  nickName: string,
  avatarUrl: string,
  phoneNum: string,
  accountId: string,
  password: string,
  faceUrl: string,
  permission: string,
  faceOpen: false,
}

export interface IDesignDocument {
  templateId: ObjectId,
  createUserId: ObjectId,
  info: string,
  coverUrl: string,
  designName: string,
}

export interface ITemplateDocument {
  createUserId: ObjectId,
  userCount: number,
  category: array<string>,
  coverUrl: string,
  templateName: string,
}
