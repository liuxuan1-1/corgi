// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/controller/account';
import ExportImg from '../../../app/controller/img';
import ExportTemplate from '../../../app/controller/template';

declare module 'egg' {
  interface IController {
    account: ExportAccount;
    img: ExportImg;
    template: ExportTemplate;
  }
}
