(function(){
	
	//克隆数据
	window.clone = function(obj){
		var cobj = new obj.constructor;
		for(var attr in obj){
			if(typeof obj[attr] == "object"){
				cobj[attr] = clone(obj[attr]);
			}else{
				cobj[attr] = obj[attr];
			}
		}
		return cobj;
	}
	
})()