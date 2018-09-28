
(function(){
	
	window.jsonp = function(obj){
//		var defaultObj = {
//			url:obj.url,
//			callBack:obj.callback
//		}
		var oScript = document.createElement("script");
		oScript.src = obj.url+"&cb="+obj.callBack;
		
		var body = document.getElementsByTagName("body")[0];
		body.appendChild(oScript);
		console.log(oScript.src);
	}
	
})()
