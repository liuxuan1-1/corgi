// This file is created by egg-ts-helper@1.24.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/controller/account';
import ExportDesign from '../../../app/controller/design';
import ExportImg from '../../../app/controller/img';
import ExportTemplate from '../../../app/controller/template';

declare module 'egg' {
  interface IController {
    account: ExportAccount;
    design: ExportDesign;
    img: ExportImg;
    template: ExportTemplate;
  }
}
