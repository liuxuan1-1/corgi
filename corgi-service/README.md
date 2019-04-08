# 接口说明

|路径|说明|传参|
|:----|:----|:-----|
|`/api/accounts/login`|登录接口|`accountId`: 用户名, `password`: 密码, `remember`: 记住我|
|`/api/accounts/sign`|注册接口|`accountId`: 用户名, `password`: 密码, `nickName`: 姓名, `avatarUrl`: 头像地址, `phoneNum`: 手机号码|
|`/api/accounts/update`|更新信息接口|`accountId`: 用户名, `nickName`: 姓名, `avatarUrl`: 头像地址, `faceUrl`: 头像地址 , `phoneNum`: 手机号码|
|`/api/accounts/exit`|退出登录接口||
|`/api/accounts/openface`|开启人脸二次验证|`open`: 是否开启|
|`/api/accounts/getuserinfo`|获取用户信息||
|`/api/template/getlist`|获取模板列表|`category`: 分类|
|`/api/template/getfile`|获取模板编辑数据|`id`: 模板id|
|`/api/template/getmine`|获取我的模板列表||
|`/api/template/create`|新建模板||
|`/api/template/delete`|删除模板|`id`: 模板id|
|`/api/template/release`|是否发布模板|`id`: 模板id, `isRelease`: 是否发布|
|`/api/template/save`|保存我的文件|`fileName`: 文件名, `info`: 信息, `category`: 分类, `coverUrl`: 模板封面|
|`/api/design/getlist`|获取我的文件列表||
|`/api/design/getfile`|获取文件信息|`id`: 文件id|
|`/api/design/delete`|删除我的文件|`id`: 文件id`|
|`/api/design/create`|创建文件|`templateid`: 模板id|
|`/api/design/save`|保存我的文件|`fileName`: 文件名, `info`: 信息, `id`: design id,`coverUrl`: 设计文件封面|
|`/api/img/uploadAvatar`|上传头像||
|`/api/img/uploadFace`|上传人脸头像||
|`/api/img/uploadMaterial`|上传素材图片||
|`/api/img/uploadcover`|上传封面|`templateid`: 模板id, `designid`: 文件id|
|`/api/img/getMaterial`|获取素材||
|`/api/img/delete`|删除图片|`id`:图片id|





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
