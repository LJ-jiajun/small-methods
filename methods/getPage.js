
(function(){
	
	/*
	 	hash : hash值代表当前页数
	 	pageNum : 代表总的页码
	 	pageLen : 代表需要显示的页码长度
	 	return: 返回一个page对象保存了开始值和结束值
	 */
	window.getPage = function(hash,pageNum,pageLen){
		if(!pageLen){
			pageLen = 7;
		}
		var page = {};
		page.start = 1;
		page.end = pageLen;
		if(pageNum>=7){
			if(hash>5){
				page.start = hash-3;
				page.end = hash+3;
				if(page.end>=pageNum){
					page.end = pageNum;
					page.start = page.end-6;
				}
			}else{
				page.start = 1;
				page.end =  7;
			}
		}
//		var page = $(".page");
//		var pageText = "";
//		for(var i=start;i<=end;i++){
//			if(i==hash){
//				pageText += '<a href="weibo.html#page='+i+'" class="active">'+i+'</a>';
//			}else{
//				pageText += '<a href="weibo.html#page='+i+'">'+i+'</a>';
//			}
//		}
		return page;
	}
	
})()
