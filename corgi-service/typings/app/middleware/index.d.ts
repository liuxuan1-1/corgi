// This file is created by egg-ts-helper@1.24.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUserCheck from '../../../app/middleware/userCheck';

declare module 'egg' {
  interface IMiddleware {
    userCheck: typeof ExportUserCheck;
  }
}
