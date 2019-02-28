# 接口说明

|路径|说明|传参|
|:----|:----|:-----|
|`/api/accounts/login`|登录接口|`accountId`: 用户名, `password`: 密码|
|`/api/accounts/sign`|注册接口|`accountId`: 用户名, `password`: 密码, `nickName`: 姓名, `avatarUrl`: 头像地址, `phoneNum`: 手机号码|
|`/api/img/upload`|上传图片||





## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+
