var controller = require('../controller/index');
var robot = require('../server/robot');
var path = require('path');
var Router = require('koa-router')
var service = require('../server/service');

module.exports = function(){

	var router = new Router({})
    //首页
    router.get('/index',robot.formatIndex,controller.index);
    router.get('/leftInfo',robot.leftInfo)

    //message页面
    router.get('/message',robot.formatMessage,controller.message)


    //上传页面
    router.get('/upload',controller.upload)
    router.post('/openid',robot.getOpenid)
    router.post('/forward',service.koaBody,robot.uploadMaterial)
    router.post('/forwardNoImg',service.koaBodyNoImg,robot.uploadMaterial)

    return router;
};