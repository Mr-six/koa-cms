## 文件上传

### get /oss 获取oss临时授权信息 (管理员权限)
- token token 值 header
返回示例:
```
{
    "success": true,
    "data": {
        "AccessKeySecret": "2Y5cHGQepVCsDBSvugQLutfLNKiDmU5K3snde5cMVu6A",
        "AccessKeyId": "STS.FjUUe9LPVfvj5GPMTR4Wv6kjX",
        "Expiration": "2017-10-19T12:17:54Z",
        "SecurityToken": "CAIS5gF1q6Ft5B2yfSjIp6ngHt+NoY930bSBN2HhqVQHONha2a7Bujz2IH1PeHlvB+Adsfw+nGlR7fYclqp6U4cd0r1qoVAzvPpt6gqET9frma7ctM4p6vCMHWyUFGSIvqv7aPn4S9XwY+qkb0u++AZ43br9c0fJPTXnS+rr76RqddMKRAK1QCNbDdNNXGtYpdQdKGHaOITGUHeooBKJVRs351Qn0DoiuPnvnpXC0HeE0g2mkN1yjp/qP52pY/NrOJpCSNqv1IR0DPGci3IAtEYar/gu3fQdoGyX4MvxBlhY5AVoun8cTBCXRhqAASeqhp+XEc+KrUK5Ojdkf5WmcGSR32Q264dZH/GsC4y0T8JflvLC9sW0IMt5YB2ns0ddppc1Wa9Ki1d8A50MlHJfcbAHKqxYRPNfwqUSdTYvam8quGaZ/Mna4mokwQ1jcpMQe0PzRXeMOkoIMsaDPSWLk72qiZK8Y3910Rb+DE7F",
        "region": "oss-cn-beijing",
        "bucket": "jyy-miao"
    }
}
```
### get /qiniu 获取七牛简单上传临时koken (管理员权限)
- token token 值 header
返回示例:
```
{
    "success": true,
    "data": {
        "token": "t9Eddw4UXPEcYhFMvQFi3WkAQT0x4NXyRnqAvmAw:H2GMJgKcgeFR7o6sZxWXoOp3zoM=:eyJzY29wZSI6Im1yc2l4IiwiZGVhZGxpbmUiOjE1MDg0MTQ5NDh9"
    }
}
```

### post /upload  文件上传到服务器
- token token 值 header
返回示例:
```
完善中
```