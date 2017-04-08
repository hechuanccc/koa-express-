
var views = require('co-views');
var koa = require('koa');
//配置文件
var config = require('./config/config');
var path = require('path');

var app = koa();
app.use(function *(next){
    //config 注入中间件，方便调用配置信息
    if(!this.config){
        this.config = config;
    }

	this.render = views(path.join(__dirname, '/view'), { ext: 'ejs' });

    yield next;
});

var onerror = require('koa-onerror');
onerror(app);


var session = require('koa-session');
app.keys = ['qingclass-distribution']
app.use(session(app));


//post body 解析
var bodyParser = require('koa-bodyparser');



//静态文件cache
// var staticCache = require('koa-static-cache');
// var staticDir = config.staticDir;
// app.use(staticCache(staticDir+'/javascripts'));
// app.use(staticCache(staticDir+'/stylesheets'));

var staticServer = require('koa-static');
app.use(staticServer(path.join(__dirname,'public')));

//路由
var router = require('./router/routes')();


app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.port);
console.log('listening on port %s',config.port);

module.exports = app;

