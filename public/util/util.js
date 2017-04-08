var util = (function(){
		var errorMsg = {
			getCommonDiv : (function(){
			    var result = {};
			    return function(key){
			        if (result[ key ]) {     
			            return result[ key ]
			        }else {
			            var div = create('div')
			            div.className = 'animated bounceIn notOpen box '+key+'';
			            var close = create('div');
			            close.className = 'close';
			       
			            div.appendChild(close);
			            return result[ key ] = div;
			        }
			    }
			})(),

			createCommonContent : (function(){
			    var result = {};
			    return function(key,fn,obj){
			        var obj = obj ? obj : {};
			        return result[ key ] ? result[ key ] : (result[ key ] = fn(obj))
			    }
			})(),


			getErrorContent : function(obj){
			    console.log(obj)
			    var oContent = create('div');
			    oContent.className = 'content-box';
			    
			    var title = create('h2');
			    title.className = 'title';
			    title.innerHTML = '抱歉';

			    var oP = create('p');
			    oP.className = 'return-error';
			    oP.innerHTML = obj.errorMsg;
			    oContent.appendChild(title);
			    oContent.appendChild(oP);
			    
			    return oContent;
			},

			init : function(msg,fn){
			    var oBox = this.getCommonDiv('errorExsit');
			    var content = this.createCommonContent('errorExsit',this.getErrorContent,{errorMsg:msg});
			    oBox.appendChild(content);
			    document.body.appendChild(oBox);
			    oBox.style.display = 'block';
			    var load = document.querySelector('.load4');
			    load && (load.style.display = 'none')
			    fn && fn.call(oBox)
			}


		}
	


	var addCookie = function (name,value,iDay){
		if (iDay) {
			var oDate=new Date();
			oDate.setDate(oDate.getDate()+iDay);
			console.log(oDate)
			document.cookie=name+'='+value+'; path=/; expires='+oDate;
		}else{
			document.cookie=name+'='+value+'; path=/';
		}
	};

	var addCookieForSec = function (name,value,iDay){

		if (iDay) {
			var oDate=new Date();
			oDate.setTime(oDate.getTime()+iDay*1000);

			console.log(value)
			console.log(typeof value)
		
			 document.cookie=name+'='+value+'; path=/; expires='+oDate.toGMTString();
	
		}else{
			document.cookie=name+'='+value+'; path=/';
		}
	};

	var getCookie = function (name){
		var arr=document.cookie.split('; ');
		for(var i=0;i<arr.length;i++){
			var arr2=arr[i].split('=');
			if (arr2[0]==name) {
				return arr2[1];
			}
		}
		return '';
	};

	var removeCookie = function (name){
		addCookie(name,'123',-1);	
	};

	var domReady = function (fn){
	    if(document.addEventListener){
	        document.addEventListener('DOMContentLoaded', function(){
	            fn && fn();
	        }, false);
	    }else{
	        document.onreadystatechange=function(){
	            if(document.readyState=='complete'){
	                fn && fn();
	            }
	        };
	    }
	};

	/**
	 * Created by hechuan on 2016/5/9.
	 */
	function json2url(json){
	    json.t=Math.random();
	    var arr=[];
	    for(var name in json){
	        arr.push(name+'='+json[name]);
	    }
	    return arr.join('&');
	};
	function ajax(json){
	    var json=json || {};
	    if(!json.url)return;
	    json.data=json.data || {};
	    json.timeout=json.timeout || 600000;
	    json.type=json.type || 'get';

	    // 1、准备ajax对象
	    if(window.XMLHttpRequest){
	        var oAjax=new XMLHttpRequest();
	    }else{
	        var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	    }
	    // 2、建立连接
	    // 3、发送请求
	    switch(json.type.toLowerCase()){
	        case 'get':
	            oAjax.open('GET', json.url+'?'+json2url(json.data), true);
	            oAjax.send();
	            break;
	        case 'post':
	            oAjax.open('POST', json.url, true);
	            oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	            oAjax.send(json2url(json.data));
	            break;
	    }
	    json.fnLoading && json.fnLoading();
	    // 4、接收数据
	    oAjax.onreadystatechange=function(){
	        if(oAjax.readyState==4){
	            json.complete && json.complete();
	            if((oAjax.status>=200 && oAjax.status<300) || oAjax.status==304){
	                json.success && json.success(oAjax.responseText);
	            }else{
	                json.error && json.error(oAjax.status);
	            }
	            clearTimeout(timer);
	        }
	    };

	    var timer=setTimeout(function(){
	        console.log('网络超时 util ajax');
	       var bounceIn = document.querySelector('.bounceIn')
	       if (!bounceIn) {
	       	errorMsg.init('服务正忙,请稍后再试',function(){
	       	    var close = document.querySelector('.close');
	       	    close.addEventListener('touchstart',function(){
	       	    	UI.loader.style.display = 'none';
	       	    	
	       	        this.parentNode.style.display = 'none';
					location.href = ''

	       	        return false;
	       	    },false)
	       	})
	       }
	        oAjax.onreadystatechange=null;
	    }, json.timeout);
	};

	var fommatCookieDate = function(string){
		var json = JSON.parse(string);
		if (typeof json === 'string') {
			return this.fommatCookieDate(json)
		}else {
			return json
		}
	} 

	var getQueryData = function(queryString) {

	    /* 去掉字符串前面的"?"，并把&amp;转换为& */
	    queryString = queryString.replace(/^\?+/, '').replace(/&amp;/, '&');
	    var querys = queryString.split('&'),
	        i = querys.length,
	        _URLParms = {};

	    while (i--) {
	        item = querys[i].split('=');
	        if (item[0]) {
	            var value = item[1] || '';
	            try {
	                value = decodeURIComponent(value);
	            } catch (e) {
	                value = unescape(value);
	            }
	            _URLParms[decodeURIComponent(item[0])] = value;
	        }
	    }
	    return _URLParms;
	}

	return {
		addCookie: addCookie,
		addCookieForSec:addCookieForSec,
		getCookie: getCookie,
		removeCookie: removeCookie,
		domReady: domReady,
		ajax: ajax,
		fommatCookieDate: fommatCookieDate,
		getQueryData: getQueryData
	}
})()
