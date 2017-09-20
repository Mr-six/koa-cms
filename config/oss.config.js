module.exports = {
    accessKeyId: 'LTAIrlFoK5gc16EA',
    accessKeySecret: 'CXB3YmCg6W22M84Dkh7OvowerLNjbg',
    bucket: 'jyy-miao',
    region: 'oss-cn-beijing',
    role: 'miao',
    TokenExpireTime: 1000,
    policy: {
        "Statement": [
            {
            "Action": [
                "oss:*"
            ],
            "Effect": "Allow",
            "Resource": ["acs:oss:*:*:*"]
            }
        ],
        "Version": "1"
        },
}