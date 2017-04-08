

    var message = function(){
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

        //var joinTime = document.querySelector('.joinTime')
        //var des = document.querySelector('.des');
        var line = document.querySelector('.line');
        //var oBtn = document.querySelector('.withdraw-able');
        //var oCon = oBtn.querySelector('.seg2').innerHTML;

        var bFlagMask = false;

        if(brower.versions() === 'iPhone') {
            //var title = document.querySelector('.title b');
            
           //joinTime.classList.add('iphone1')
           //des.classList.add('iphone2')
           line.classList.add('iphone3')
          
           //title.style.paddingTop = '0.2rem';

        }else if(brower.versions().type === 'Android'){
            var title = document.querySelector('.title b');
            title.style.paddingTop = '0'
        }


        var oBtn = document.querySelector('button')
        var textarea = document.querySelector('textarea')
        var limit = document.querySelector('.limit100')
        var oInp = document.querySelector('input');
        oBtn.onclick = function() {

            if (textarea.value.length > 100) {
                limit.style.display = 'block';
                return
            }
            if (!textarea.value.trim()) {
                textarea.focus()
                return
            }
            var msg = textarea.value;
            var url = oInp.value;



            util.ajax({
                url:'./msgtoSources',
                type:'POST',
                data:{
                    openid:textarea.getAttribute('id'),
                    msg: msg,
                    url: url
                },
                success:function(res){
                    var data = JSON.parse(res);
                    if (!!data.status) {
                        getMask()
                        document.querySelector('.mask').style.display = 'block';
                        textarea.value = '';
                        msgInfo(data.message) 
                        limit.style.display = 'none';

                    }else { 
                        getMask()
                        document.querySelector('.mask').style.display = 'block';
                        textarea.value = '';
                        msgInfo(data.message) 
                        limit.style.display = 'none';

                    }
                    
                },
                error:function(err){
                    msgInfo('发送失败，请稍后再试')
                }
            })

        }
    }


    util.domReady(message)

    var createCommonContent = (function(){
        var result = {};
        return function(key,fn,obj){
            var obj = obj ? obj : {};
            return result[ key ] ? result[ key ] : (result[ key ] = fn(obj))
        }
    })()


    var getCommonDiv = (function(){
        var result = {};
        return function(key){
            if (result[ key ]) {     
                return result[ key ]
            }else {
                var div = create('div')
                div.className = 'animated bounceIn box box2 '+key+'';
                var close = create('div');
                close.className = 'close';
                close.addEventListener('touchstart', function(){
                    handleClose.call(this.parentNode);
                    document.querySelector('.mask').style.display = 'none';
                },false)
                div.appendChild(close);
                return result[ key ] = div;
            }
        }
    })()

    var getMask = (function(){
        var result;
        return function(){
            if (result) {
                return result
            }else {
                var mask = create('div');
                mask.className = 'mask';
                document.body.appendChild(mask);
                mask.style.height = window.innerHeight;
                return result = mask;
            }    
        }
    })()

    var msgInfo = function(msg){
        var oBox = getCommonDiv('msgInfo');
        var content = createCommonContent('msgInfo',msgContent,{msg:msg});
        oBox.appendChild(content);
        document.body.appendChild(oBox);
        oBox.style.display = 'block'
    }

    var msgContent = function(obj){
        var oContent = create('div');
        oContent.className = 'content-box';
        

        var title = create('h2');
        title.className = 'title';
        title.innerHTML = '哈喽，班长';

        var oP = create('p');
        oP.className = 'return-error';
        oP.innerHTML = obj.msg;
        oContent.appendChild(title)
        oContent.appendChild(oP)
        
        return oContent;
    }

     var create = function(tagName){
            return document.createElement(tagName)
        }

    var handleClose = function() {

        this.style.display = 'none';
    }









