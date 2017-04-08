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