﻿//获得不同的速度曲线
var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};


//让一个元素的以多个样式运动
function moreMove(obj,attrs,time,type){
	/*
	   obj : 运动元素
	   attrs : 运动的样式及目标的结果集合
	   time : 运动的时间
	   type : 运动的类型 
	*/
	var t = 0; //计数器
	var d = time/20; //次数
	var b = {}; //初始值集合
	var c = {}; //差值集合
	var timer = 0;
	
	//通过循环，把值放入对象b,c中
	for(var attr in attrs){
		b[attr] = getCSS(obj,attr);
		c[attr] = attrs[attr] - getCSS(obj,attr);
	}
	
	timer = setInterval(function(){
		t++;
		for(var k in b){
			var num = Tween[type](t, b[k], c[k], d);
			if(k == 'opacity'){
				obj.style[k] = num;
				obj.style['filter'] = 'alpha(opacity='+num*100+')';
			}else{
				obj.style[k] = num+'px';
			}
		}
		
		//关闭定时器
		if(t>=d){
			clearInterval(timer);
		}
	},20);
}

//让一个元素的以一个样式运动
function move(obj,attr,target,time,type,fn,fn1){
	/*
	   obj  : 运动元素
	   attr : 运动的样式
	   target : 目标的结果
	   time  : 运动的时间
	   type :运动的类型 
	*/
	var t = 0; //计数器
	var b = getCSS(obj,attr); //初始值
	var c = target-b; //差值
	var d = time/20; //次数
	var timer = null;
	clearInterval(timer);
	
	timer = setInterval(function(){
		t++;
		//运动函数调用的返回值
		var num = Tween[type](t, b, c, d);
		if(attr == 'opacity'){
			obj.style[attr] = num;
			obj.style['filter'] = 'alpha(opacity='+num*100+')';
		}else{
			obj.style[attr] = num+'px';
		}
		
		// 每次执行一次定时器，调用一次fn1
		if(typeof fn1 == 'function'){
			fn1()
		}
		
		// 关闭定时器
		if(t >= d){
			if(typeof fn == 'function'){
				fn();
			}
			clearInterval(timer);
		}
	},20)
	
	
}

//获取元素的css样式，兼容ie
function getCSS(obj,attr){
	// 判断是在那种浏览器里面
	if(obj.currentStyle){
		//ie浏览器
		if(attr == 'opacity'){
			var a = obj.currentStyle['filter'].slice(14,-1);
			return parseFloat(a/100);
		}else{
			return parseFloat(obj.currentStyle[attr]);
		}
	}else{
		// 谷歌浏览器
		return parseFloat(getComputedStyle(obj)[attr])
	}
}

//获取元素
function $(name,parent){				
	parent = parent || document;
	var first = name.substring(0,1);
	var all = parent.getElementsByTagName('*');
	var arr = [];

	if(first == '#'){
		var id = name.substring(1);
		return parent.getElementById(id);
	}else if(first == '.'){
		var className = name.substring(1);
		for(var i=0;i<all.length;i++){

			if(all[i].className){
				if(all[i].className.indexOf(className) != -1){
					arr.push(all[i])
				}
			}
		}
		return arr;
	}else{	
		return parent.getElementsByTagName(name);
	}
}

//去掉字符串的首尾空格
function trim(str){
	return str.replace(/^\s+|\s+$/g,"");
}

//给元素新增一个class
function addClass(obj,className){
	if(obj.className){
		if(obj.className.indexOf(className) == -1){
			obj.className += " "+className;
		}else{
			return;
		}
	}else{
		obj.className = className;
	}
}

//删除元素的一个class
function removeClass(obj,className){
	var zz = new RegExp(className);
	if(obj.className){
		if(obj.className.indexOf(className) == -1){
			return;
		}else{
			console.log(zz,obj.className);
			obj.className = trim(obj.className.replace(zz,""));
		}
	}else{
		return;
	}
}

//如果元素没有这个class就新增，有了就删除
function toggleClass(obj,className){
	if(obj.className){
		if(obj.className.indexOf(className) == -1){
			addClass(obj,className);
		}else{
			removeClass(obj,className);
		}
	}else{
		obj.className = className;
	}
}