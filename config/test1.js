//本地调试环境配置
var path = require('path');
module.exports = {
    "env":"test1",
    "debug": true,
   	"uploadUrl": "http://service/relation/api/set/share-info",

   	//code换openid
   	"codeUrl": "http://service/auth/auth/api/auth/",

	"redirectUrl":'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1d358b95855ea869&redirect_uri=http://test1.qingclass.com/qingclass-distribution/index&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect',
   

   	"headImgSize":'http://service/referral/user/contacts/headimg/openid/0',

   	"leftInfo": 'http://service/referral/balance/get/amount-left/',
   	"isOpen": 'http://service/referral/retail/get/open/',
   	
};