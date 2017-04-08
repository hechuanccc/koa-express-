//本地调试环境配置
var path = require('path');
module.exports = {
    "env":"local",
    "debug": true,
    "uploadUrl": "http://test1.qingclass.com/relation/api/set/share-info",
    "codeUrl": "http://test1.qingclass.com/auth/auth/api/auth/",
    "leftInfo": "http://test1.qingclass.com/referral/balance/get/amount-left/",
    "isOpen": "http://test1.qingclass.com/referral/retail/get/open/",
	"redirectUrl":'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1d358b95855ea869&redirect_uri=http://test1.qingclass.com/qingclass-distribution/index&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect',
    "headImgSize":'http://test1.qingclass.com/referral/user/contacts/headimg/openid/0',

};