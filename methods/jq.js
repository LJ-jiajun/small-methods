
(function(Sizzle){
	
	// 构造函数
	function Pl(name){
		var els = Sizzle(name);
		for(var i=0;i<els.length;i++){
			els[i].removeAttribute(name.substring(1,name.length-1));
			this[i] = els[i];
		}
		this.length = els.length;
	}
	
	// 在原型对象下面写方法
	Pl.prototype.css = function(attr,value){
		for(var i=0;i<this.length;i++){
			this[i].style[attr] = value;
		}
		return this;
	}
	
	//增加类名方法
	Pl.prototype.addClass = function(classname){
		for(var i=0;i<this.length;i++){
			if(this[i].className){
				if(this[i].className.indexOf(classname) == -1){
					this[i].className = this[i].className + " " + classname;
				}
			}else{
				this[i].className = classname;
			}
		}
		return this;
	}
	
	//删除类名方法
	Pl.prototype.removeClass = function(classname){
		for(var i=0;i<this.length;i++){
			if(this[i].className){
				if(this[i].className.indexOf(classname+' ') != -1){
					this[i].className = this[i].className.split(classname+' ').join("");
				}else if(this[i].className.indexOf(' '+classname) != -1){
					this[i].className = this[i].className.split(' '+classname).join("");
				}
			}
		}
		return this;
	}
	
	Pl.prototype.toggleClass = function(classname){
		for(var i=0;i<this.length;i++){
			if(this[i].className){
				if(this[i].className.indexOf(classname) == -1){
					this.addClass(classname);
				}else{
					this.removeClass(classname);
				}
			}else{
				this.addClass(classname);
			}
		}
		return this;
	}
	
	// each 选择出来的元素的方法
	Pl.prototype.each = function(fn){
		for(var i=0;i<this.length;i++){
			fn(i,this[i]);
		}
		return this;
	}
	
	// eq  
	Pl.prototype.eq = function(num){
		for(var i=0;i<this.length;i++){
			if(i == num){
				// 留下的元素
				this[0] = this[i];
				delete this[i];
			}else{
				// 不留的元素，删除
				delete this[i];
			}	
		}
		this.length = 1;
		return this;
	}
	
	//添加点击事件方法
	Pl.prototype.click = function(fn){
		for(var i=0;i<this.length;i++){
			this[i].addEventListener("click",fn);
		}
		return this;
	}
	
	//添加事件方法
	Pl.prototype.on = function(event,fn){
		for(var i=0;i<this.length;i++){
			this[i].addEventListener(event,fn);
		}
		return this;
	}
	
	//显示元素方法
	Pl.prototype.show = function(){
		for(var i=0;i<this.length;i++){
			this[i].style.display = "block";
		}
		return this;
	}
	
	//隐藏元素方法
	Pl.prototype.hide = function(){
		for(var i=0;i<this.length;i++){
			this[i].style.display = "none";
		}
		return this;
	}
	
	//添加自定义属性方法
	Pl.prototype.attr = function(name,value){
		for(var i=0;i<this.length;i++){
			this[i][name] = value;
		}
		return this;
	}
	
	//获取上个元素方法
	Pl.prototype.prev = function(){
		return this[0].previousElementSibling;
	}
	
	//获取下个元素方法
	Pl.prototype.next = function(){
		return this[0].nextElementSibling;
	}
	
	window.$ = function(name){
		if(name.nodeName == 1){
			var attr = "jq123asd";
			var value = "jq";
			name.setAttribute(attr,value);
			var t = new Pl("["+attr+"]");
			return t;
		}else{
			var t = new Pl(name);
			return t;
		}
		
	}
	
})(Sizzle)


