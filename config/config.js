//应用配置文件
var path = require('path');
var local = require('./local');
var test1 = require('./test1')
var _ = require('underscore');
var config = {
    "title":"",
    //默认生产环境
    "env":"production",
    "appName": "qingclass-distribution",
    //端口号配置
    "port": 9001,
    //模板所在的目录
    "viewDir": path.join(__dirname,'..','view'),
    //log所在的目录
    "logDir": path.join(__dirname,'..', 'log'),
    //静态文件所在的目录
    "staticDir": path.join(__dirname,'..', 'public'),

    //uploadUrl
    "uploadUrl": "http://service/relation/api/set/share-info",

    //code换openid
    "codeUrl": "http://service/auth/auth/api/auth/",

    "redirectUrl":'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa4bbce55221cffbc&redirect_uri=https://www.qingclass.com/qingclass-distribution/index&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect',

    "headImgSize":'http://service/referral/user/contacts/headimg/openid/0',

    "leftInfo": 'http://service/referral/balance/get/amount-left/',
    "isOpen": 'http://service/referral/retail/get/open/'
};

//当NODE_ENV环境变量值为local时
//本地调试环境
if(process.env.NODE_ENV === 'test1'){
    config = _.extend(config,test1);
}else if(process.env.NODE_ENV === 'local') {
    config = _.extend(config,local);
}

module.exports = config;