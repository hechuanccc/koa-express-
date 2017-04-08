

    var scholarship = function(){
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


        var joinTime = document.querySelector('.joinTime')
        var des = document.querySelector('.des');
        var line = document.querySelectorAll('.line');
        var oBtn = document.querySelector('.withdraw-able');
        var oCon = oBtn.querySelector('.seg2').innerHTML;

        var bFlagMask = false;

        if(brower.versions() === 'iPhone') {
            var title = document.querySelector('.title b');
            
           joinTime.classList.add('iphone1')
           des.classList.add('iphone2')
           line[0].classList.add('iphone3')
           line[1].classList.add('iphone3')

        }else if(brower.versions().type === 'Android'){
            var title = document.querySelectorAll('.title b');
            for(var i=0;i<title.length;i++) {
                title[i].style.paddingTop = 0;
            }

        }



        var oCon = oBtn.querySelector('.seg2').innerHTML;
        if (oCon && oCon === '0.00') {
            var seg3 = oBtn.querySelector('.seg3');
            seg3.innerHTML = '元';
        } 

        (function(){

            var oBtn = document.querySelector('.withdraw-able');
            var mask = document.querySelector('.mask');

            oBtn.addEventListener('click', function(e){ 
                    
                    var oCon = oBtn.querySelector('.seg2').innerHTML;
                    if (oCon && oCon === '0.00') {
                        return false;
                    }      
                    var mask = getMask();
                    var oBox = getCommonDiv('detailInput');

                    
                    var content = createCommonContent('detailInput',detailInput);
                    oBox.appendChild(content);
                    document.body.appendChild(oBox);
                    oBox.style.display = 'block';
                    
                    mask.style.display = 'block';

                  
            },false)
        })()

        var handleClose = function(){
            this.style.display = 'none';
            var mask = document.querySelector('.mask');
            var oInp = document.querySelector('input[type=number]')
            oInp.blur();
            
              mask.style.display = 'none';     
            
        }

        var getCommonDiv = (function(){
            var result = {};
            return function(key){
                if (result[ key ]) {     
                    return result[ key ]
                }else {
                    var div = create('div')
                    div.className = 'animated bounceIn box '+key+'';
                    var close = create('div');
                    close.className = 'close';
                    close.addEventListener('click', function(){
                        handleClose.call(this.parentNode);
                        document.querySelector('.mask').style.display = 'none';
                    },false)
                    div.appendChild(close);
                    return result[ key ] = div;
                }
            }
        })()





        var createCommonContent = (function(){
            var result = {};
            return function(key,fn,obj){
                var obj = obj ? obj : {};
                return result[ key ] ? result[ key ] : (result[ key ] = fn(obj))
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


        var handleSub = function(e){
           
            var inpVal = document.querySelector('input[type=number]')
            var monney = document.querySelector('.withdraw-able').querySelector('.seg2').innerHTML;
           
            var n = inpVal.value;

            var m = Number(Number(n).toFixed(2));

         
            if (m < 1 || m > 200) {

                errorExsit('单次提取金额应在1~200元之间')
                return false;
            }

            if (Number(m) > Number(monney)) {
                errorExsit('亲，您余额不足哦！')
                return 
            }
           
            if (!!inpVal.value && Number(m) <= Number(monney)) {
                handleClose.call(this)
            }



                
            ifOpen(Number(inpVal.value))
        }



        var ifOpen = function(num){
            var openInfo = document.querySelector('[data-detail]').dataset.touch;
            
            var n = Number(num.toFixed(2).trim());
            var error_code = 0;
            if (!!openInfo && openInfo!='false'&&openInfo!=='0') {
                util.ajax({
                    url:'./count',
                    type:'POST',
                    data:{
                        count:n
                    },
                    success:function(res){
                        var data ;

                        try{
                            data = JSON.parse(res);
                        }catch(e){
                            console.log(e)
                            console.log('error in ajax post count')
                        }

                        if (!!data.status || !!data.error) {
                             errorExsit(data.message)         
                        }else {                            
                            isOpen(n);
                        }
                         var inpVal = document.querySelector('input[type=number]')

                        inpVal.value = '';
                    },
                    error:function(err){
                        errorExsit('发送失败，请稍后再试')
                    }
                })
            }
            else if(!openInfo || openInfo=='false' || openInfo=='0') {
                notOpen();
            }

            var mask = document.querySelector('.mask');
            mask.style.display = 'block'
        }

        var n = 0;

        var errorExsit = function(msg){
            n++;
            var oBox = getCommonDiv('errorExsit' + n);
            var content = createCommonContent('errorExsit' + n,getErrorContent,{errorMsg:msg});
            oBox.appendChild(content);
            document.body.appendChild(oBox);
            oBox.style.display = 'block';
            var detailInput = document.querySelector('.detailInput');
            if (detailInput && detailInput.style.display === 'block') {
                detailInput.style.display = 'none'
            }

        }


        var getErrorContent = function(obj){
            var oContent = create('div');
            oContent.className = 'content-box';
            

            var title = create('h2');
            title.className = 'title';
            title.innerHTML = '提取错误';

            var oP = create('p');
            oP.className = 'return-error';
            oP.innerHTML = obj.errorMsg;
            oContent.appendChild(title)
            oContent.appendChild(oP)
            
            return oContent;
        }

        var isOpen = function(num){
            var oBox = getCommonDiv('isOpen');
            var content = createCommonContent('isOpen',getOpenContent,isOpenObj);
            oBox.appendChild(content);
            document.body.appendChild(oBox);
            oBox.style.display = 'block';
            if (num) {
                
                document.querySelector('.withdraw-able').querySelector('.seg2').innerHTML -= Number(num);
                var a = document.querySelector('.withdraw-able').querySelector('.seg2').innerHTML;
                document.querySelector('.withdraw-able').querySelector('.seg2').innerHTML = Number(a).toFixed(2);
                var leftCount = document.querySelector('.withdraw-able').querySelector('.seg2').innerHTML;
                var balance = document.querySelector('.balance');
                balance.innerHTML = '¥'+Number(leftCount).toFixed(2)+'<span>元</span>';
            }
        }

        var notOpen = function(){
            var oBox = getCommonDiv('notOpen');
            var content = createCommonContent('notOpen',getOpenContent,notOpenObj);
            oBox.appendChild(content);
            document.body.appendChild(oBox);
            oBox.style.display = 'block'
        }

        var notOpenObj = {
            h2:'提现失败',
            p1:{content:'付过费的学员才能顺利体现哦^_^',name:'error-p1'},
            p2:{content:'一次付费 终身体现',name:'error-p2'},
            p3:{content:'这等好事 算我一个',name:'error-p3'},
            btn:{content:'立即购买学员',href:'http://baidu.com',name:'error-sub'}
        };


        var isOpenObj = {
            h2:'提现',
            p1:{content:'已成功提交提现申请！',name:'suc-p1'},
            p2:{content:'三天内会发红包给你哟! ',name:'suc-p2'},
            p3:{content:'听轻课还能挣钱',name:'suc-p3'},
            p4:{content:'这种好事一般人我不告诉他',name:'suc-p4'},
            btn:{content:'分享学员卡给更多好友',href:'',name:'suc-sub'}
        };

        var getOpenContent = function(obj){
           var  con = getCommon(obj);
           
           con.oContent.appendChild(con.title);

           con.oContent.appendChild(con.oP1);
           con.oContent.appendChild(con.oP2);
           con.oContent.appendChild(con.oP3);

           if (con.oP4) {
               con.oContent.appendChild(con.oP4)
           }
          
           return con.oContent
        }


        var onlyNum = function(){
            this.value = this.value.replace(/[^0-9\.]/g,'');
            var n = this.value.indexOf('.')
            if (n!=-1) {
                try {
                    this.value = this.value.substring(0,n+3)
                } catch(e) {
                    // statements
                    console.log(e);
                }
            }
        }



        var create = function(tagName){
            return document.createElement(tagName)
        }

        var getCommon = function(obj){

            var oContent = create('div');
            oContent.className = 'content-box';

            var title = create('h2');
            title.className = 'title';
            title.innerHTML = obj.h2;

            var oP1 = create('p');
            oP1.className = obj.p1.name;
            oP1.innerHTML = obj.p1.content;

            var oP2 = create('p');
            oP2.className = obj.p2.name;
            oP2.innerHTML = obj.p2.content;

            var oP3 = create('p');
            oP3.className = obj.p3.name;
            oP3.innerHTML = obj.p3.content;

           if (obj.p4) {
               var oP4 = create('p')
               oP4.innerHTML = obj.p4.content;
               oP4.className = obj.p4.name;
           }

            // var button = create('button')
            
            // button.innerHTML = obj.btn.content;
            // if (obj.btn.href) {
            //      button.setAttribute('data-href', obj.btn.href);   
            // }

            if (obj.p4) {
                return {title:title,oP1:oP1,oP2:oP2,oP3:oP3,oP4:oP4,oContent:oContent}
            }else  {
                return {title:title,oP1:oP1,oP2:oP2,oP3:oP3,oContent:oContent}    
            }
        }


        var detailInput = function (){
            var oContent = create('div');
            oContent.className = 'content-box';

            var title = create('h2');
            title.className = 'title';
            title.innerHTML = '提现';

            var oP1 = create('p');
            oP1.className = 'p1';
            oP1.innerHTML = '· 付过费的学员才能提现';

            var oP2 = create('p');
            oP2.className = 'p2';
            oP2.innerHTML = '· 提现将于3天内, 以红包的方式发送';

            var oP3 = create('p');
            oP3.className = 'p3'
            oP3.innerHTML = '请在下框输入本次提现金额(单位: 元)';

            var item = create('div');
            item.className = 'item';

            oContent.appendChild(title);
            item.appendChild(oP1);
            item.appendChild(oP2);
            item.appendChild(oP3);

            var form = create('div');
            form.className = 'inpBox';

          

            var oInp = create('input');
            oInp.setAttribute('type', 'number');
            oInp.className = 'apply-money';
            oInp.setAttribute('placeholder','1-200元之间')
            oInp.oninput = onlyNum;
            //oInp.focus();

            var div = create('div');
            div.className = 'fore1'

            var oP4 = create('p');
            oP4.className = 'p4';
            oP4.innerHTML = '提成余额';

            var balance = create('div');
            balance.className = 'balance';
            var leftCount = document.querySelector('.withdraw-able').querySelector('.seg2').innerHTML;
            
            balance.innerHTML = '¥'+Number(leftCount).toFixed(2)+'<span>元</span>';

            div.appendChild(oP4);
            div.appendChild(balance);    

            form.appendChild(oInp);
            form.appendChild(div);
          
            var button = create('button');
            button.className = 'sub';
            button.innerHTML = '提交提现申请';
            button.addEventListener('click', function(){
                handleSub.call(oContent.parentNode)
            },false)

            item.appendChild(form);

            item.appendChild(button);

            oContent.appendChild(item);

            return oContent;
        }


        var handleUpdate = function(json){
            //console.log(json)
            var oBox = document.querySelector('.contacts-consumption');

            oBox.innerHTML = '<div class="seg1">我的班级成员总消费&nbsp;</div>';
            var past = document.querySelector('.shared-revenue').querySelector('.seg3');
            var totalCount = 0;
            for(var i = 0,l=json.list.length;i<l;i++) {
                var total = document.createElement('div')
                total.classList.add('seg2');

                var a = Number(json.list[i].payTotal)
                total.innerHTML = a.toFixed(2);
                oBox.appendChild(total);

                var rate = create('div');
                rate.classList.add('seg3');

                var b = Number(json.list[i].rate);
                rate.innerHTML = '&nbsp×&nbsp'+ parseInt(b*100)+'%'+'+';
                if(i == json.list.length-1) {
                    rate.innerHTML = '&nbsp×&nbsp'+ b*100 + '%';
                }
                totalCount+=a*b;
                oBox.appendChild(rate);
                if (json.list[i].degree ==1) {
                    var oCon = document.querySelector('.rate-con');
                    oCon.innerHTML = (json.list[i].rate*100).toFixed(2)
                }
            }

            past.innerHTML = Number(totalCount).toFixed(2);

            var leftBox = document.querySelector('.withdraw-able');
            var left = leftBox.querySelector('.seg2')
            left.innerHTML = Number(json.left).toFixed(2);

        }

        limitFetch.getFromCookie(handleUpdate);

      

    }


    util.domReady(scholarship)









