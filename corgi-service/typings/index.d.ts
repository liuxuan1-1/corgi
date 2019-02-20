import 'egg';

declare module 'egg' {

}

export interface IResponseBody {
  success: boolean,
  message: string,
  data: {
    [propName: string]: any,
  }
}