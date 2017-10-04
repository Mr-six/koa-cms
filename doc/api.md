## api 参考
### 用户操作

#### post /user/login 用户登陆
发送参数：(email 和手机二选一)
- email 邮箱
- phone 手机号码
- password 密码

返回值：
```
{
    "success": true,
    "msg": "",
    "data": {
        "_id": "59c61f1a34364c197fb0ce19",
        "updatedAt": "2017-10-03T07:52:16.292Z",
        "createdAt": "2017-09-23T08:45:14.497Z",
        "code": "8ie9ek9tbi6",
        "password": "Zsin90=1!m",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTljNjFmMWEzNDM2NGMxOTdmYjBjZTE5IiwicGVybWlzc2lvbiI6MSwiaWF0IjoxNTA3MDE3MTM2LCJleHAiOjE1MDc2MjE5MzZ9.MomOMTXd1GB3JRKi5pYk3Eh2BVmqdCIPcZN9gB0uo_U",
        "phone": {
            "hidden": false
        },
        "wechat": {
            "hidden": false
        },
        "email": {
            "addr": "582497915@1w.com",
            "hidden": false
        },
        "nickname": "用户52gaxgl6x9n",
        "zmz": {
            "favList": []
        },
        "status": -1,
        "permission": 1,
        "weight": 0,
        "send_at": "2017-10-03 15:52:46",
        "created_at": "2017-09-23 16:45:14",
        "updated_at": "2017-10-03 15:52:16"
    }
}
```

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