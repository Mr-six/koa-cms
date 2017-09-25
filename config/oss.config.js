module.exports = {
    accessKeyId: 'LTAIrlFoK5gc16EA',
    accessKeySecret: 'CXB3YmCg6W22M84Dkh7OvowerLNjbg',
    bucket: 'jyy-miao',
    region: 'oss-cn-beijing',
    role: 'acs:ram::1197563115958406:role/miao',
    TokenExpireTime: 1000,
    policy: {
        "Statement": [
            {
            "Action": "sts:AssumeRole",
            "Effect": "Allow",
            "Principal": {
                "RAM": [
                "acs:ram::1197563115958406:root"
                ]
            }
            }
        ],
        "Version": "1"
    }
}