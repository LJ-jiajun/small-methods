
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
	 * success:传输成功的函数
	 * error:传输失败的函数
	 * dataType:返回数据的类型
	 */
	window.$_ajax = function(obj){
		// 创建ajax实例
		var Ajax = new XMLHttpRequest();
		
		var initObj = {
			type: obj.type||'get',
			url: obj.url,
			data: obj.data,
			success: obj.success,
			error: obj.error||function(){
				console.log("出现错误："+Ajax.status);
			},
			ansys: (obj.ansys=== false)?false:true,
			dataType: obj.dataType||''
		}
		
		var str = "";
		if(typeof initObj.data == "object"){
			for(var attr in initObj.data){
				str += attr+"="+encodeURI(initObj.data[attr])+"&";
			}
			str = str.slice(0,-1);
		}
		
		if(initObj.type.toLowerCase()  == "get"){
			// 链接后台
			Ajax.open('get',url+"?"+str,true);
			// 发送信息
			Ajax.send();
		}else if(initObj.type.toLowerCase() == "post"){
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
					if(initObj.dataType == 'json'){
						if(typeof initObj.success == "function"){
							initObj.success(Ajax.responseText);
						}
					}else if(initObj.dataType == 'xml'){
						if(typeof initObj.success == "function"){
							initObj.success(Ajax.responseXML);
						}
					}else{
						if(typeof initObj.success == "function"){
							initObj.success(Ajax.responseText);
						}
					}
				}else{
					if(typeof initObj.error == "function"){
						initObj.error(Ajax.responseText);
					}
				}
			}
		}
	}
	
	/*
	 * url:目标地址
	 * f:传输的文件
	 * success:传输成功的函数
	 * error:传输失败的函数
	 * dataType:返回数据的类型
	 */
	window.ajax_img = function(obj){
				
		var form = new FormData();
		form.append("file",obj.f.files[0]);
		
		var ajax = new XMLHttpRequest();
		
		var initObj = {
			f: obj.f,
			url: obj.url,
			success: obj.success||function(){
				console.log("成功");
			},
			error: obj.error||function(){
				console.log("出现错误："+ajax.status);
			},
			dataType: obj.dataType||''
		}
		
		ajax.open("post",obj.url,true);
		
		ajax.send(form);
		
		ajax.onreadystatechange = function(){
			// 接收后台反馈的信息
			if(ajax.readyState == 4){
				if(ajax.status>=200&&ajax.status<=207){
					if(initObj.dataType == 'json'){
						if(typeof initObj.success == "function"){
							initObj.success(ajax.responseText);
						}
					}else if(initObj.dataType == 'xml'){
						if(typeof initObj.success == "function"){
							initObj.success(ajax.responseXML);
						}
					}else{
						if(typeof initObj.success == "function"){
							initObj.success(ajax.responseText);
						}
					}
				}else{
					if(typeof initObj.error == "function"){
						initObj.error(ajax.responseText);
					}
				}
			}
		}
	}
})()

		
		