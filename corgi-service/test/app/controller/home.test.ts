// import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/home.test.ts', () => {
  it('should GET /', async () => {
    const result = await app.httpRequest().post('/api/accounts/login').expect(200);
    console.log(result);
    // assert(result.text === 'hi, egg');
  });
});
