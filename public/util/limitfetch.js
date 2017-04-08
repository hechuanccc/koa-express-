var limitFetch = (function(){

	var errorMsg = (function(){

		return {
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
	})()
	var openid = document.querySelector('.head').dataset.id;
	var limitObj = {
		getFromCookie: function(fn){
			var data = util.getCookie('hechuan3'+openid);
			if (data) {
				console.log('cookie里有数据')
				info = localStorage.getItem(openid)
				var data = util.fommatCookieDate(info)
				console.log(data)
				fn && fn(data)
			}else {
				this.setDataToCookie(fn,openid)
			}						
		},
		setDataToCookie: function(fn){

			util.ajax({
				//leftInfo
				url:"./leftInfo",
				type:"GET",
				timeout:60000,
				success:function(json){
					
					util.addCookieForSec('hechuan3'+openid,'123',20);
					localStorage.setItem(openid,JSON.stringify(json))
					var data;
					try{
						data = util.fommatCookieDate(json)
					}catch(e){
						console.log(e)
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
						util.removeCookie('hechuan3'+openid);
						localStorage.removeItem(openid)

					}
					fn && fn(data)

					console.log('cookie没有数据 走fetch 或者 第一次点击按钮');
					
					
				},
				error:function(){
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
				
				}
			})
		}

	}
	return limitObj
})()