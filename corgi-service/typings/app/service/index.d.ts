// This file is created by egg-ts-helper@1.24.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDesign from '../../../app/service/design';
import ExportFace from '../../../app/service/face';
import ExportTemplate from '../../../app/service/template';
import ExportUpload from '../../../app/service/upload';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    design: ExportDesign;
    face: ExportFace;
    template: ExportTemplate;
    upload: ExportUpload;
    user: ExportUser;
  }
}
