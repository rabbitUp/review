$(document).ready(function(){
	class Canvas{
		constructor(content){
			this.content = content;
			this.lineWidth = 3;  //默认线宽
			this.strokeStyle = '#000';   //默认轮廓颜色为黑色
			this.fillStyle = '#000';  //默认填充颜色为黑色
			this.eW = 10;    //橡皮大小
			this.r = 30;     //默认弧度
			this.way = 'fill'//画画方式默认为填充
			this.fun = 'linear'; //默认渐变方式为线性渐变
			this.colorArr = ['red','yellow']; // 渐变两种颜色
			this.n = 3;
		}
		//画线
		paintLine(ox1,oy1,ox2,oy2){
			this.content.beginPath();
			this.content.moveTo(ox1,oy1);
			this.content.lineTo(ox2,oy2);
			this.content.strokeStyle = this.strokeStyle;
			this.content.lineWidth = this.lineWidth; 
			this.content.stroke();
			this.content.closePath();
		}
		//画矩形
		paintRect(ox1,oy1,ox2,oy2){
			this.content.beginPath();
			if(this.way =='fill'){
				this.content.fillRect(ox1,oy1,ox2-ox1,oy2-oy1);
				this.content.fillStyle=this.fillStyle;
				this.content.fill();
			}else{
				this.content.strokeRect(ox1,oy1,ox2-ox1,oy2-oy1);
				this.content.lineWidth = this.lineWidth;
				this.content.strokeStyle = this.strokeStyle;
				this.content.stroke();
			}
			this.content.closePath();
		}
		//画圆角矩形
		paintRarect(ox1,oy1,ox2,oy2){
			this.content.beginPath();
			this.r = parseInt(this.r);
			this.content.moveTo(ox1+this.r,oy1);
			this.content.arcTo(ox2,oy1,ox2,oy1+this.r,this.r);
			this.content.arcTo(ox2,oy2,ox2-this.r,oy2,this.r);
			this.content.arcTo(ox1,oy2,ox1,oy2-this.r,this.r);
			this.content.arcTo(ox1,oy1,ox1+this.r,oy1,this.r);
			if(this.way =='fill'){
				this.content.fillStyle=this.fillStyle;
				this.content.fill();
			}else{
				this.content.lineWidth = this.lineWidth;
				this.content.strokeStyle = this.strokeStyle;
				this.content.stroke();
			}
			this.content.closePath();
		}
		//画圆
		paintCircle(ox1,oy1,ox2,oy2){
			this.content.beginPath();
			let ru = Math.sqrt(Math.pow(ox2-ox1,2)+Math.pow(oy2-oy1,2));
			paint.arc(ox1,oy1,ru,0,Math.PI*2);
			if(this.way =='fill'){
				this.content.fillStyle=this.fillStyle;
				this.content.fill();
			}else{
				this.content.lineWidth = this.lineWidth;
				this.content.strokeStyle = this.strokeStyle;
				this.content.stroke();
			}
			this.content.closePath();
		}
		//画多边形
		paintPoly(ox1,oy1,ox2,oy2){
			this.content.beginPath();
			let ran = 360/this.n;
			let r = Math.sqrt(Math.pow(ox2-ox1,2)+Math.pow(oy2-oy1,2));
			for(let i = 0;i<this.n;i++){
				let x = ox1+Math.sin((i*ran+45)*Math.PI/180)*r;
				let y = oy1+Math.cos((i*ran+45)*Math.PI/180)*r;
				this.content.lineTo(x,y);
			}
			if(this.way =='fill'){
				this.content.fillStyle=this.fillStyle;
				this.content.fill();
				this.content.closePath();
			}else{
				this.content.lineWidth = this.lineWidth;
				this.content.strokeStyle = this.strokeStyle;
				this.content.closePath();
				this.content.stroke();
			}
		}
		//橡皮
		eraser(ox2,oy2){
			this.content.beginPath();
			console.log(ox2-(this.eW/2),oy2-(this.eW/2),this.eW,this.eW);
			this.content.clearRect(ox2-(this.eW/2),oy2-(this.eW/2),this.eW,this.eW);
			this.content.closePath();
		}
		//渐变方式
		color(ox1,oy1,ox2,oy2){
			if(this.fun == 'linear' ){
				let linear = this.content.createLinearGradient(ox2,oy2,ox1,oy1);
				linear.addColorStop(0,this.colorArr[0]);
				linear.addColorStop(1,this.colorArr[1]);
				this.fillStyle = linear;
			}else{
				let ra = this.content.createRadialGradient(0,0,ox1,0,0,ox2);
				ra.addColorStop(0,this.colorArr[0]);
				ra.addColorStop(1,this.colorArr[1]);
				this.fillStyle = ra;
			}
		}
	}
	//获取元素
	//基础功能区
	//获取新建画布按钮
	let set = $('.set');
	let canvas;
	let paint;
	set.click (function(){		
		canvas = $('canvas');
		if(canvas.length){
			if(confirm('是否保存当前画布？')){
				let date = canvas[0].toDataURL('image/png');
				window.open(date.replace('data:image/png','data:stream/octet'));
			}
			document.body.removeChild(canvas[0]);
		}
		let newCanvas = document.createElement('canvas');
		newCanvas.width = 1090;
		newCanvas.height = 480;
		document.body.appendChild(newCanvas);
		paint = newCanvas.getContext('2d');
		let shape = 'line';
		let flag = false;
		//实例化canva对象
		let pObj = new Canvas(paint);
		newCanvas.onmousedown = function(e){
			let ox1 = e.offsetX;
			let oy1 = e.offsetY;
			newCanvas.onmousemove = function(e){
				let ox2 = e.offsetX;
				let oy2 = e.offsetY;
				if(shape != 'eraser'){
					paint.clearRect(0,0,newCanvas.width,newCanvas.height);
					if(arr.length>0){
						paint.putImageData(arr[arr.length-1],0,0);
					}
					switch (shape){
						case 'line':
							pObj.paintLine(ox1,oy1,ox2,oy2);
							break;
						case 'rect':
							pObj.paintRect(ox1,oy1,ox2,oy2);
							if(flag){
								pObj.color(ox1,oy1,ox2,oy2);
							}
							break;
						case 'raRect':
							pObj.paintRarect(ox1,oy1,ox2,oy2);
							if(flag){
								pObj.color(ox1,oy1,ox2,oy2);
							}
							break;
						case 'circle':
							pObj.paintCircle(ox1,oy1,ox2,oy2);
							if(flag){
								pObj.color(ox1,oy1,ox2,oy2);
							}
							break;
						case 'poly':
							pObj.paintPoly(ox1,oy1,ox2,oy2);
							if(flag){
								pObj.color(ox1,oy1,ox2,oy2);
							}
							break;
					}
				}else{
					pObj.eraser(ox2,oy2);
				}
			}
			newCanvas.onmouseup = function(e){
				this.onmousemove = null;
				arr.push(paint.getImageData(0,0,newCanvas.width,newCanvas.height));
			}
		}
		//形状按钮动作的添加
		let line = document.querySelector('.line');
		let btn = document.querySelectorAll('.shape button');
		btn[0].id = 'active';
		$('.shape button').each(function(index,val){
			$(val).click (function(){
				$('.shape button').removeAttr('id');
				$(this).attr('id','active');
				if(index == 0){
					shape = 'line';
				}else if(index == 1){
					shape = 'rect';
				}else if(index == 2){
					shape = 'raRect';
				}else if(index == 3){
					shape = 'circle';
				}else if(index == 4){
					shape = 'poly';
				}else if(index == 5){
					shape = 'eraser';
				}
			});
		});
		//是否填充按钮动作的添加
		$('.one button').eq(1).attr('id','active');
		let change = document.querySelectorAll('.two button');
		$('.one button').each(function(index,val){
			$(val).click(function(){
				$('.two button').each(function(index,val){
					$(val).removeAttr('id');
				});
				$('.one button').each(function(index,val){
					$(val).removeAttr('id');
				});
				flag = false;
				$(this).attr('id','active');
				pObj.way = val.className;
			});
		});
		//颜色按钮动作的添加
		$('.one input').each(function(index,val){
			$(val).change(function(){
				pObj[val.className] = val.value;				
			});
		});
		//渐变按钮动作的添加
		$(change).each(function(index,val){
			$(val).click (function(){
				$(change).each(function(index,val){
					$(val).removeAttr('id');
				});
				$(this).attr('id','active');
				if(!flag){
					pObj.fun = val.className;
					flag = true;
			    }
			});
		});
		//按钮颜色的添加
		let colors = document.querySelectorAll('.two input');
		$(colors).each(function(index,val){
			$(val).change(function(){
				pObj.colorArr[0] = $(colors).get(0).value;
				pObj.colorArr[1] = $(colors).get(1).value;
			});
		});
		//线宽的设置
		let inputs = document.querySelectorAll('.minute input');
		$(inputs).each(function(index,val){
			$(val).change(function(){
				pObj[val.id] = val.value;
			});
		});
		//返回按钮的获取
		let back = document.querySelector('.return');
		let arr = [];
		$(back).click (function(){
			arr.pop();
			if(arr.length > 0 ){
				paint.putImageData(arr[arr.length-1],0,0);	
			}else if(confirm('是否清空画布？')){
				paint.clearRect(0,0,newCanvas.width,newCanvas.height);
				arr = [];
			}
		});
	});
	//保存画布
	let save = document.querySelector('.save');
	$(save).click ( function(){
		if($('canvas').length){
			if(confirm('是否保存当前画布？')){
				let date = $('canvas').get(0).toDataURL('image/png');
				window.open(date.replace('data:image/png','data:stream/octet'));	
			}
		}
	});
	let box = document.querySelector('.tool');
	let flagBox = true;
	$(box).dblclick ( function(){
		if(flagBox){
			flagBox = false;
			this.style.height = 40 +'px';
			document.querySelector('canvas').height = 600;
		}else{
			this.style.height = 170+'px';
			document.querySelector('canvas').height = 480;
			flagBox = true;
		}
	});	
	});