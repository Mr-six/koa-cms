## api 参考
### 用户操作

#### post /user/login 用户登陆
发送参数：(email 和手机二选一)
- email 邮箱
- phone 手机号码
- password 密码

返回值：

#### post /user/signup 用户注册
发送参数：(email 和手机二选一)
- email 邮箱
- phone 手机号码
- password 密码

返回数据：
```
{
    "msg": "",
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
```
#### post /user/resetPassword 更改用户密码