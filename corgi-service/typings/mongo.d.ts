import { ObjectId } from 'mongodb';


export interface IFileInfo {
  element: Array<{
    [propName: string]: any,
  }>,
  root: {
    css: {
      [propName: string]: any,
    },
    size: string,
  },
}

export interface IDesignSaveParam {
  info: IFileInfo,
  fileName: string,
  id: string,
}

export interface ITemplateSaveParam extends IDesignSaveParam {
  category: array<string>,
}


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
  info: any,
  coverUrl: string,
  designName: string,
}

export interface ITemplateDocument {
  createUserId: ObjectId,
  userCount: number,
  info: IFileInfo,
  category: array<string>,
  coverUrl: string,
  templateName: string,
  isRelease: boolean,
}
