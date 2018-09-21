
(function(){
	
	window.ajax = function(type,url,data,fn,dataType){
		// 创建ajax实例
		var Ajax = new XMLHttpRequest();
		
		if(typeof data == "object"){
			var str = "";
			for(var attr in data){
				str += attr+"="+encodeURI(data[attr])+"&";
			}
			str = str.slice(0,-1);
		}
		
		if(type == "get"){
			var getUrl = url+"?"+str;
			
			// 链接后台
			Ajax.open('get',getUrl,true);
			
			// 发送信息
			Ajax.send();
			
		}else if(type == "post"){
			// 链接后台
			Ajax.open('post',url,true);
			
			// 当用post传送数据时，必须设置请求头
			Ajax.setRequestHeader("content-type","application/x-www-form-urlencoded");
			
			// 发送信息
			Ajax.send(str);
		}
		
		// 等待接通的一个事件
		Ajax.onreadystatechange = function(){
			// 接收后台反馈的信息
			if(Ajax.readyState == 4){
				if(Ajax.status>=200&&Ajax.status<=207){
					if(typeof fn == "function"){
						fn(Ajax.responseText);
					}
				}
			}
		}
	}
	
	/*
	 * type:ajax传输方式
	 * url:目标地址
	 * data:传输的数据
	 * success:成功的函数
	 * failure:失败的函数
	 * dataType:数据类型
	 */
	
})()

		
		