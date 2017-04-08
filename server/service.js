

var fs = require('fs');
var path = require('path');

var Promise = require('bluebird');
var request = require('request');
var myPath = path.join(__dirname,'..','uploadimg')
var _ = require('lodash');




exports.removeAllImg = function(){
	console.log('22222222')
	var rmImgPath = path.join(__dirname, '..', 'uploadimg');
	return new Promise(function(resolve,reject){
		var folder_exists = fs.existsSync(rmImgPath);
		if (!!folder_exists) {
			var dirList = fs.readdirSync(rmImgPath);
			dirList.forEach(function(fileName){
				fs.unlinkSync(rmImgPath+'/'+fileName)
			})
		}
		resolve('删除完成')
	})
}

exports.koaBody = require('./koaBody')({
	multipart: true,
	formidable: {
	  uploadDir: myPath,
	  keepExtensions: true,
	  onFileBegin:function(name,file){
	    console.log(name)
	    console.log(file)
	    if (file.name && file.path) {
	    	file.path = myPath + '/' +file.name	    	
	    }
	  }
	}
})

exports.koaBodyNoImg = require('./koaBody')({multipart:true})

exports.uploadImg = function(uploadUrl,form){
	return new Promise(function(resolve,reject){

		request.post({url:uploadUrl,formData:form},function(err,response,body){

			if (err) {
				console.log(err)
				return
			}
			var _data = JSON.parse(body);

			console.log(response.body)
			console.log(typeof response.body)

			if (_data.return_code !== 'success') {
			   console.log('上传失败')

			    resolve({
			    	return_code:"failed",
			    	info:"上传失败"
			    })
			}

			resolve(_data)
		})
	})
}


exports.isOpen = function(config,openid) {
	return new Promise(function(resolve,reject){
		request({url:config.base + config.isOpen + openid},function(err,response,body){
			if (!!err) {
				reject(err)
				return
			}
			var data;

			try{
				data = JSON.parse(response.body)
			}catch(e){
				return reject(e)
			}

			resolve(data)
			
		})
	})
}

exports.userInfo = function(config,openid){
	return new Promise(function(resolve,reject){
		request({url:config.base + config.userInfo + openid},function(err,response,body){
			if (err) {
				reject(err)
			}

			var data;
			try{
				data = JSON.parse(response.body)
			}catch(e){
				reject(e)
			}

			resolve(data)

		})
	})
}

exports.codeToOpenid = function(config,code){
	return new Promise(function(resolve,reject){
		request(config.authCode + code,function(err, response, body){
			if (err) {
				return reject(err)
			}

			var data;

			try{
				data = JSON.parse(body)
			}catch(e){
				reject(e)
			}

			resolve(data.openId)
		})
	})
}

exports.headImgSize = function(config,openid){
	var url = config.headImgSize.replace('openid',openid)
	return new Promise(function(resolve,reject){
		request(url,function(err, response, body){
			if (err) {
				return reject(err)
			}

			var data;

			try{
				data = JSON.parse(body)
			}catch(e){
				reject(e)
			}

			var size = data.map.size;
			if (!size) {
				size = 0;
			}

			resolve(size)
		})
	})
}




 