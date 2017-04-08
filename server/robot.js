'use strict'

var Promise = require('bluebird');
var request = require('request');
var removeAllImg = require('./service').removeAllImg;
var _ = require('lodash')
var formidable = require('formidable');
var fs = require('fs');
var service = require('./service')


exports.getOpenid = function *(next){
	var config = this.config;
	var code = this.request.query.code;
	var _this = this;
	
	 this.body = {
		status: 0,
		openid: "onrunxMqKefqBWleK25ad2IVcqb8",
		uploadUrl: config.base + config.uploadUrl
	}

	return next
}

exports.uploadMaterial = function *(next){
	var _this = this;

	var fields = this.request.body.fields;
	var files = this.request.body.files;
	var uploadUrl = this.config.uploadUrl;
	var uploadImg = require('./service').uploadImg;

  console.log(fields)

  var form = {
	    "openId": fields.openId,
	    "href": fields.href,
	    "content":fields.content         
	}

  if (!!files.image2) {
		var data = yield uploadImg(uploadUrl,form);
		this.body = data

  }else {
   	form = _.extend(form,{"image": fs.createReadStream(files.image.path)})
   
   	var data = yield uploadImg(uploadUrl,form);

   	removeAllImg();

    this.body = data
  }
	 
}

exports.leftInfo = function *(next){
	var _this = this;
	return new Promise(function(resolve,reject){
		request2({url:_this.config.base+_this.config.leftInfo + req.session.openid,json:true}).then(function(response){
			if (!response.body.openId || !response.body.list) {
				_this.body = {
					"error":1
				}
			}
			_this.body = response.body
		}).catch(function(e){
			console.log(e)
			throw new Error("route leftInfo 捕获错误"); 
		})

	})
}

exports.formatIndex = function *(next){
	if (!!this.session.openid) {
		console.log('this.session.openid')
		console.log(this.session.openid)

		var openid = this.session.openid;
		var openMsg = yield service.isOpen(this.config,openid);
		this.openMsg = openMsg;
		if (!openMsg.isOpen) {
			return next
		}else{
			var userInfo = yield service.userInfo(this.config,openid);
			if (!userInfo.return_code !== 'success') {
				return this.throw('userInfo not success')
			}

			var data = _.extend(userInfo.map,{joinTime:userInfo.map.create_time,openid:openid})
			this.data = data;
			return next;
		}

	}else {
			var code = this.query.code;
			if (!code) {

				return this.redirect(this.config.redirectUrl)
			}
			console.log('no session')

			var openid = yield service.codeToOpenid(this.config,code);
			this.session.openid = openid;
			var openMsg = yield service.isOpen(this.config,openid);
			this.openMsg = openMsg;
			if (!openMsg.isOpen) {
				return next
			}else{
				var userInfo = yield service.userInfo(this.config,openid);
				if (!userInfo.return_code !== 'success') {
					return this.throw('userInfo not success')
				}

				var data = _.extend(userInfo.map,{joinTime:userInfo.map.create_time,openid:openid})
				this.data = data;
				return next;
			}

	}
}

exports.formatMessage = function *(next){
	var path = this.path.replace('/','');
	var redirectUrl = this.config.redirectUrl.replace('index',path);
	console.log("redirectUrl is " + redirectUrl);
	if (!!this.session.openid) {
		console.log('this.session.openid')
		console.log(this.session.openid)

		var openid = this.session.openid;
		var openMsg = yield service.isOpen(this.config,openid);
		this.openMsg = openMsg;
		if (!openMsg.isOpen) {
			return next
		}else{
			var userInfo = yield service.userInfo(this.config,openid);
			if (!userInfo.return_code !== 'success') {
				return this.throw('userInfo not success')
			}

			var size = yield service.headImgSize(this.config,openid);


			var data = _.extend(userInfo.map,
				{joinTime:userInfo.map.create_time,openid:openid,size:size,headimgurl:userInfo.map.headimgurl,nickname:userInfo.map.nickname})
			this.data = data;
			return next;
		}

	}else {
			var code = this.query.code;
			if (!code) {

				return this.redirect(redirectUrl)
			}

			var openid = yield service.codeToOpenid(this.config,code);
			console.log('no session')
			this.session.openid = openid;
			var openMsg = yield service.isOpen(this.config,openid);
			this.openMsg = openMsg;
			if (!openMsg.isOpen) {
				return next
			}else{
				var userInfo = yield service.userInfo(this.config,openid);
				if (!userInfo.return_code !== 'success') {
					return this.throw('userInfo not success')
				}

				var size = yield service.headImgSize(this.config,openid)


				var data = _.extend(userInfo.map,
					{joinTime:userInfo.map.create_time,openid:openid,size:size,headimgurl:userInfo.map.headimgurl,nickname:userInfo.map.nickname})
				this.data = data;
				return next;
			}
	}

}
