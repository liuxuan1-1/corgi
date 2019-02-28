# 数据库

```javascript
// user表
db.user.insert({
  nickName: "刘翾",
  avatarUrl: "",
  phoneNum: "12344557788",
  accountId: "admin",
  password: "admin",
  faceUrl: "",
  permission: "root"
  lastLoginTime: '时间'
})

// avatarUrl: 资料头像地址
// faceUrl: 登录人脸头像地址
// permission: 
//    "root" => 超级管理员, 有全部权限
//    "generalUser" => 普通用户
//    "professional" => 专业设计人员
```


```javascript
// design表
db.design.insert({
    templateId: "asdasd",
    createUserId: "asdasd",
    info: "{}",
    coverUrl: ""
})

// info: JSON Schema信息
// coverUrl: 封面url
```


```javascript
// template表
db.template.insert({
    createUserId: "asdasd",
    info: "{}",
    useCount: 0,
    category: ["默认"]
})
```