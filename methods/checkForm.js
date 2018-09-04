
//验证用户名，长度为2到20的字母和数字集合
function checkUserName(userName){
	//正则表达式，匹配长度为2到20的字母和数字集合
	var Reg=/^[a-zA-Z0-9]{2,20}$/; 
	if(userName.trim() == "")){ 
		alert("用户名不能为空！");
		return false; 
	}else if(!Reg.test(userName.trim())){ 
		alert("请输入正确格式的用户名，2到20的字母和数字集合");
		return false; 
	}else{
		return true;
	}
}