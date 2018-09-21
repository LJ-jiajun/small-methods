
(function(){
	
	
	
	window.ajax = function(method,url,data,fn,dataType){
		
		
		// 创建ajax实例
		var ajax = new XMLHttpRequest();
		
		if(method.toLowerCase() == 'post'){
			ajax.open('post',url,true);
			ajax.setRequestHeader("content-type","application/x-www-form-urlencoded");
			ajax.send(data);
			
		}else if(method.toLowerCase() == 'get'){
			ajax.open('get',url+'?'+data,true);
			ajax.send();
			
		}
		
		ajax.onreadystatechange = function(){
			// 判断ajax步骤是否完成
			if(ajax.readyState == 4){
				// 判断后台给的反馈信息
				if(ajax.status>=200&&ajax.status<=207){
					if(dataType == 'json'){
						var json = (new Function('','return'+ajax.responseText))();
						fn(json);
					}else if(dataType == 'xml'){
						//fn(ajax.responseText);
						//console.log(ajax.responseXML)
						fn(ajax.responseXML)
					}else{
						fn(ajax.responseText);
					}
					
				}else{
					alert('错误是:'+ajax.status)
				}
			}	
		}		
	}
	
	window.$_ajax = function(obj){
		
		// 创建ajax实例
		var ajax = new XMLHttpRequest();
		var opation = {
			type: obj.type||'get',
			url:obj.url,
			data:obj.data,
			success:obj.success,
			erorr:obj.erorr||function(){
				console.log('错误是'+ajax.status)
			},
			ansys:(obj.ansys=== false)?false:true,
			dataType:obj.dataType||''
		}
		
		var str = '';
		if(opation.data){
			for(var attr in opation.data){
					str += attr+'='+opation.data[attr]+'&';
			}
		}
		if(opation.type.toLowerCase() == 'post'){
			ajax.open('post',opation.url,opation.ansys);
			ajax.setRequestHeader("content-type","application/x-www-form-urlencoded");
			ajax.send(str);
			
		}else if(opation.type.toLowerCase() == 'get'){
			if(opation.data){
				ajax.open('get',opation.url+'?'+str,true);
			}else{
				ajax.open('get',opation.url,true);
			}
			ajax.send();
		}
		
		ajax.onreadystatechange = function(){
			// 判断ajax步骤是否完成
			if(ajax.readyState == 4){
				// 判断后台给的反馈信息
				if(ajax.status>=200&&ajax.status<=207){
					if(opation.dataType == 'json'){
						var json = (new Function('','return'+ajax.responseText))();
						opation.success(json);
					}else if(opation.dataType == 'xml'){
						opation.success(ajax.responseXML);
					}else{
						opation.success(ajax.responseText);
					}	
				}else{
					opation.erorr();
				}
			}	
		}	
		
	}
	
})()



