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
- nickname 用户名

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
发送参数：（email或手机号）
- token token值
- password 旧密码
- newpassword 新密码

返回结果：
```
{
    "success": true,
    "msg": "",
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
```

### 文章相关
#### get /article/all 文章查找
发送参数：
- start 数据起始页
- limit 每页数据数量
返回结果：
```
{
    "success": true,
    "msg": "",
    "data": [
        {
            "_id": "59d460a4e64ea6101ad1f485",
            "updatedAt": "2017-10-04T04:16:36.780Z",
            "createdAt": "2017-10-04T04:16:36.780Z",
            "title": "测试文章2",
            "content": "hhhh",
            "headerImg": "https://avatars3.githubusercontent.com/u/16644635?v=4&s=40",
            "markdown": "'#markdown jyy'",
            "user": {
                "_id": "59d3425aac96081fe614d48f",
                "nickname": "用户2q0xo170sja",
                "send_at": "2017-10-04 13:42:08",
                "created_at": "2017-10-04 13:42:08",
                "updated_at": "2017-10-04 13:42:08"
            },
            "_index": 2,
            "likes": [],
            "sendAt": "2017-10-04T04:16:36.774Z",
            "tags": [],
            "send_at": "2017-10-04 12:16:36",
            "created_at": "2017-10-04 12:16:36",
            "updated_at": "2017-10-04 12:16:36"
        },
        {
            "_id": "59d460115e07950fd8980661",
            "updatedAt": "2017-10-04T04:14:09.341Z",
            "createdAt": "2017-10-04T04:14:09.341Z",
            "title": "测试文章",
            "content": "hhhh",
            "headerImg": "https://avatars3.githubusercontent.com/u/16644635?v=4&s=40",
            "markdown": "'#markdown jyy'",
            "user": {
                "_id": "59d3425aac96081fe614d48f",
                "nickname": "用户2q0xo170sja",
                "send_at": "2017-10-04 13:42:08",
                "created_at": "2017-10-04 13:42:08",
                "updated_at": "2017-10-04 13:42:08"
            },
            "_index": 1,
            "likes": [],
            "sendAt": "2017-10-04T04:14:09.335Z",
            "tags": [],
            "send_at": "2017-10-04 12:14:09",
            "created_at": "2017-10-04 12:14:09",
            "updated_at": "2017-10-04 12:14:09"
        }
    ]
}
```
#### post /article/create 文章创建
发送参数：
- token 
- title 标题
- subTitle 副标题
- headerImg 头部图片
- content 文字内容
- markdown markdown 格式的文字

返回结果：
```
{
    "success": true,
    "msg": "",
    "data": {
        "updatedAt": "2017-10-04T04:16:36.780Z",
        "createdAt": "2017-10-04T04:16:36.780Z",
        "title": "测试文章2",
        "content": "hhhh",
        "headerImg": "https://avatars3.githubusercontent.com/u/16644635?v=4&s=40",
        "markdown": "'#markdown jyy'",
        "user": "59d3425aac96081fe614d48f",
        "_id": "59d460a4e64ea6101ad1f485",
        "_index": 2,
        "likes": [],
        "sendAt": "2017-10-04T04:16:36.774Z",
        "tags": [],
        "send_at": "2017-10-04 12:16:36",
        "created_at": "2017-10-04 12:16:36",
        "updated_at": "2017-10-04 12:16:36"
    }
}
```
#### post /article/delete 文章删除
发送参数：
- token 
- id 文章 id

返回结果：
```
{
    "success": true,
    "msg": "",
    "data": {
        "_id": "59d4798fb2d49618660eec38",
        "updatedAt": "2017-10-04T06:02:55.394Z",
        "createdAt": "2017-10-04T06:02:55.394Z",
        "title": "测试文章7",
        "content": "hhhh",
        "headerImg": "https://avatars3.githubusercontent.com/u/16644635?v=4&s=40",
        "markdown": "'#markdown jyy'",
        "user": {
            "_id": "59d3425aac96081fe614d48f",
            "nickname": "用户2q0xo170sja",
            "send_at": "2017-10-04 14:03:34",
            "created_at": "2017-10-04 14:03:34",
            "updated_at": "2017-10-04 14:03:34"
        },
        "_index": 4,
        "likes": [],
        "sendAt": "2017-10-04T06:02:55.393Z",
        "tags": [],
        "send_at": "2017-10-04 14:02:55",
        "created_at": "2017-10-04 14:02:55",
        "updated_at": "2017-10-04 14:02:55"
    }
}
```

#### post /article/update 文章更新
发送参数：
- token 
- id 文章 id
- data 更新数据

返回结果：
```
{
    "success": true,
    "msg": "",
    "data": {
        "_id": "59d47855fb7ca417e2dbdf79",
        "updatedAt": "2017-10-04T06:29:35.907Z",
        "createdAt": "2017-10-04T05:57:41.246Z",
        "title": "更新测试",
        "content": "hhhh",
        "headerImg": "https://avatars3.githubusercontent.com/u/16644635?v=4&s=40",
        "markdown": "'#markdown jyy'",
        "user": "59d3425aac96081fe614d48f",
        "_index": 4,
        "likes": [],
        "sendAt": "2017-10-04T05:57:41.246Z",
        "tags": [],
        "send_at": "2017-10-04 13:57:41",
        "created_at": "2017-10-04 13:57:41",
        "updated_at": "2017-10-04 14:29:35"
    }
}
```