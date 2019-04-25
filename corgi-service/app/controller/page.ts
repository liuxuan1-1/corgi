import { Controller } from 'egg';
import fs = require('fs');

export default class PageController extends Controller {
  public async home() {
    const { ctx } = this;
    ctx.type = 'text/html';
    ctx.body = fs.createReadStream('app/public/build/home.html');
  }

  public async editor() {
    const { ctx } = this;
    ctx.type = 'text/html';
    ctx.body = fs.createReadStream('app/public/build/editor.html');
  }

}
