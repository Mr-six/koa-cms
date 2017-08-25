## 基于koa2 的后台管理系统

### 特性
- 认证采用jsonwebtoken便于前后分离以及便于移动端开发
  - 解析jsonwebtoken后为用户_id和权限permission的对象
- 后端数据库采用MongoDB便于数据的扩展
- 

### 功能实现
- [x] 注册登录
- [x] 认证管理
- [ ] 权限管理
- [ ] 用户管理
- [ ] 内容管理
- [ ] 文件上传管理
- [ ] 集成cdn上传服务
- [ ] 邮件系统
- [ ] 前端页面

### 详细api
[api参考]()

### 依赖
mongoDB:latest node:latest 
- joi             对象验证
- koa2            基础框架
- koa-bodyparser　解析post
- koa-cors        跨域控制
- koa-jwt         jsonwebtoken验证
- koa-log4        日志管理
- koa-router      路由
- moment        　时间格式化
- mongoose      　MongoDB管理

### 目录结构
```
|-- api             主要接口文件
|    |-- v１　　　　　　第一版本
|       |-- base.js 　基础类
|       |-- index.js　入口文件
|       |-- user.js 　用户接口文件
|    |-- index.js     api入口
|-- config          配置文件
|    |-- index.js     配置入口
|    |-- log.js       日志配置文件
|    |-- schema.js    后端对象验证配置
|-- models          mongodb数据结构
|    |-- vi           第一版本
|       |-- index.js  入口
|       |-- user.js   用户数据结构
|    |-- base.js      数据基础结构类
|    |-- index.js     入口文件
|    |-- routers      后端路由
|       |-- index.js  入口
|       |-- user.js   用户路由
|    |-- utils        工具函数
|       |-- auth.js   认证中间价
```

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