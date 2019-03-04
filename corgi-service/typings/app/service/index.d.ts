// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDesign from '../../../app/service/design';
import ExportTemplate from '../../../app/service/template';
import ExportUpload from '../../../app/service/upload';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    design: ExportDesign;
    template: ExportTemplate;
    upload: ExportUpload;
    user: ExportUser;
  }
}
