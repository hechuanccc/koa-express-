 			var h = window.screen.height;
 			var body = document.body
 			var oBtnBox = document.getElementById('buttonBox')
 		  	var oForm = document.getElementById('form');
 		  	var reset = document.getElementById('reset');
 		  	var submit = document.getElementById('submit');
 		  	var percent = document.getElementById('percent');
 			var son =  document.getElementById('son'); 
 			var box = document.getElementById('box'); 
 		  	

 			var imgBox = document.getElementById("imgBox"); //获取显示图片的div元素
 			var input = document.getElementById("imgFile"); //获取选择图片的input元素
 		
 			var bodyH = body.style.height;
 			var oBtnBoxH = oBtnBox.getBoundingClientRect().top;
 			var oFormH = oForm.getBoundingClientRect().top;
 			var imgBoxH = imgBox.getBoundingClientRect().top;
 			var imgFile = document.getElementById('imgFile'); 


 			imgBox.style.height = (oBtnBoxH - imgBoxH - 10) + 'px';
 			imgBox.style.lineHeight = (oBtnBoxH - imgBoxH - 10) + 'px'

 			 //percent.style.lineHeight = h + 'px'; 
 			
 			var chunkSize = 2 * 1024 * 1024 // 大于2m的图片不能上传

 			      //这边是判断本浏览器是否支持这个API。
 			if(typeof FileReader==='undefined'){ 
 			    imgBox.innerHTML = "抱歉，你的浏览器不支持 FileReader"; 
 			    input.setAttribute('disabled','disabled'); 
 			}else{ 
 			    input.addEventListener('change',readFile,false); //如果支持就监听改变事件，一旦改变了就运行readFile函数。
 			} 

 			var code = util.getQueryData(window.location.search).code;

 			var uploadUrl;
 			var openid;
 			var imgBase64 ='';

 			util.ajax({
 				type:'post',
 				url:"./openid",
 				data:{
 					code:code
 				},
 				success:function(data){
 					var json = data;

 					try{
 						json = JSON.parse(data)
 					}catch(e){
 						console.log('error' + e)
 					}
 					uploadUrl = json.uploadUrl;
 					openid = json.openid

 					console.log("uploadUrl: " + uploadUrl)
 					console.log("openid: " + openid)


 				},
 				error:function(){
 					alert('页面发生错误，请重新刷新')
 				}
 			})
	      
 			function readFile(){ 
 			    var file = this.files[0]; //获取file对象
 			    //判断file的类型是不是图片类型。
 			    if(!/image\/\w+/.test(file.type)){ 
 			        alert("文件必须为图片！"); 
 			        return false; 
 			    } 


 			    if (file.size > chunkSize) {
 			    	alert('上传图片不能大于2M')
 			    	return false;
 			    }
 			    
 			    var reader = new FileReader(); //声明一个FileReader实例
 			    reader.readAsDataURL(file); //调用readAsDataURL方法来读取选中的图像文件

 			    reader.onerror = function() {
 			    	alert('Could not read file, error code is' + reader.error.code)
 			    }
 			    //最后在onload事件中，获取到成功读取的文件内容，并以插入一个img节点的方式显示选中的图片
 			    reader.onload = function(e){	 			      
 			         imgBox.style.backgroundImage = 'url('+reader.result+')';
 			         imgBox.style.backgroundSize = 'cover';
 			         imgBox.innerHTML = '';
 			         imgBase64 = reader.result;		      	       
 			    } 
 			}

 			submit.onclick = function() {
 				
 				var oContent = document.getElementById('name');
 				var oUrl = document.getElementById('email');

 				son.innerHTML = '正在上传,请稍后'

 				if (!oContent.value.trim() && !oUrl.value.trim() && (!imgBox.style.backgroundImage || imgBox.style.backgroundImage === 'none')) {
 					return
 				}
 				
 				if (!oContent.value.trim()) {
 					oContent.value = '';
 				}
 				if (!oUrl.value.trim()) {
 					oUrl.value = '';
 				}

 				var postUrl;

 				if (!imgBox.style.backgroundImage || imgBox.style.backgroundImage === 'none') {
 					imgFile.setAttribute('name','image2')
 					postUrl='./forwardNoImg'
 					
 				}else {
 					imgFile.setAttribute('name','image')
 					postUrl='./forward'
 				}


			
 				box.style.display = 'block'; 
 				var data = new FormData(oForm);

 				
 				data.append("openId",openid)
 				data.append("content",encodeURI(encodeURI(oContent.value)))

 				var xhr = createXHR();
 				xhr.onload = function(event) {
 					if ((xhr.status >=200 && xhr.status < 300) || xhr.status == 304) {
 					
 					}else {
 						alert("ajax error" + xhr.status)
 					}

 					var json;
 					try{
 						json = JSON.parse(xhr.responseText);
 					}catch(e){
 						console.log('JSON.parse error' + e)
 						throw new Error("JSON.parse error"); 
 					}

 					if (!!json["return_code"] && json["return_code"] !== "success") {
 						alert("上传出错，请重试")
 						return false
 					}
 					son.innerHTML = '上传成功！'

 					setTimeout(function(){
 						box.style.display = 'none';
 					},1000)

 				}

 				
 				xhr.open("post",postUrl,true);
 				
 				xhr.send(data)
 			}

 			reset.onclick = function() {
 				
 				var aInp = document.getElementsByTagName('input');
 				
 				for(var i=0; i<aInp.length;i++) {
 					if (i<=2) {
 						aInp[i].value = ''
 					}
 					
 				}
 				imgBox.style.backgroundImage = 'none';
 				imgBox.innerHTML = '暂无图片'
 			};

 			function  createXHR(){ 
 			    
 			    //检测原生XHR对象是否存在，如果存在刚返回它的新实例； 
 			    //如果不存在，则检测ActiveX对象; 
 			    //如果两个都不存在，就抛出一个错误。 
 			    
 			    if(typeof XMLHttpRequest != "undefined"){ 
 			        return new XMLHttpRequest(); 
 			    }else if(typeof ActiveXObject != "undefined"){ 
 			        //适合IE7之前的版本 
 			        if(typeof arguments.callee.activeXString != "string"){ 
 			            var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML.XMLHttp"]; 
 			            for(var i=0,len=versions.length; i<len; i++){ 
 			                try{ 
 			                    var xhr = new ActiveXObject(versions[i]); 
 			                    arguments.callee.activeXString = versions[i]; 
 			                    return xhr; 
 			                }catch (ex){ 
 			                    //跳过 
 			                } 
 			            } 
 			        } 
 			        
 			        return new ActiveXObject(arguments.callee.activeXString); 
 			    }else{ 
 			        throw new Error("No XHR object available."); 
 			    }; 
 			}

 			

 			var brower = {
 			    versions: function() {
 			        var u = window.navigator.userAgent;
 			        var num;
 			        if (u.indexOf('Trident') > -1) {
 			            //CuPlayer.com提示：IE 
 			            return "IE";
 			        } else if (u.indexOf('Presto') > -1) {
 			            //CuPlayer.com提示：opera 
 			            return "Opera";
 			        } else if (u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1) {
 			            //firefox 
 			            return "Firefox";
 			        } else if (u.indexOf('AppleWebKit' && u.indexOf('Safari') > -1) > -1) {
 			            //CuPlayer.com提示：苹果、谷歌内核 
 			            if (u.indexOf('Chrome') > -1) {
 			                //chrome 
 			                return "Chrome";
 			            } else if (u.indexOf('OPR')) {
 			                //webkit Opera 
 			                return "Opera_webkit"
 			            } else {
 			                //Safari 
 			                return "Safari";
 			            }
 			        } else if (u.indexOf('Mobile') > -1) {
 			            //CuPlayer.com提示：移动端 
 			            if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
 			                //ios 
 			                if (u.indexOf('iPhone') > -1) {
 			                    //iphone 
 			                    return "iPhone"
 			                } else if (u.indexOf('iPod') > -1) {
 			                    //ipod 
 			                    return "iPod"
 			                } else if (u.indexOf('iPad') > -1) {
 			                    //ipad 
 			                    return "iPad"
 			                }
 			            } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
 			                //android 
 			                num = u.substr(u.indexOf('Android') + 8, 3);
 			                return { "type": "Android", "version": num };
 			            } else if (u.indexOf('BB10') > -1) {
 			                //CuPlayer.com提示：黑莓bb10系统 
 			                return "BB10";
 			            } else if (u.indexOf('IEMobile')) {
 			                //windows phone 
 			                return "Windows Phone"
 			            }
 			        }
 			    }
 			};

 			if (brower.versions()['type'] === 'Android') {
 				
 				oBtnBox.style.position = 'relative';
 				oBtnBox.style.marginTop = '1rem';
 				oBtnBox.style.bottom = '0'

 			}