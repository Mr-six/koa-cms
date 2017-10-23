## 基于koa2 的后台简易管理系统

### 特性
- 认证采用jsonwebtoken便于前后分离以及便于移动端开发
- 后端数据库采用MongoDB便于数据的扩展
- redis 保存验证码

### 功能实现
- [x] 注册登录
- [x] 认证管理
- [x] 权限管理
- [x] 用户管理
- [x] 内容管理
- [x] 文件上传管理
- [x] 集成cdn上传服务
- [x] 邮件系统
- [ ] 前端页面

### 详细api
[user api参考](./doc/user.md)


[article api参考](./doc/article.md)


[upload api参考](./doc/upload.md)

### 切换淘宝镜像(选填)
yarn config set registry https://registry.npm.taobao.org<br>
npm config set registry https://registry.npm.taobao.org<br>
或者

使用  `--registry=https://registry.npm.taobao.org`参数

查看镜像<br>
yarn config get registry<br>

### Build Setup

``` bash
# install dependencies
npm install or yarn

# serve with hot reload at localhost:3000
npm start

```