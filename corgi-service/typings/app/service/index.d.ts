// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUpload from '../../../app/service/upload';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    upload: ExportUpload;
    user: ExportUser;
  }
}
