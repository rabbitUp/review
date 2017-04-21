window.onload = function(){
	//双向轮播图
	//图片进行初始化
	let box = document.querySelector('.bDcenter');
	let imgs = document.querySelectorAll('.bDban a');
	let width = imgs[0].offsetWidth;
	let flag = true;
	//小圆点
	let circles = document.querySelectorAll('.bDcenter ul li');
	let i = 0,j = 0;//i  现在  j  后来
	imgs.forEach((val)=>{
		val.style.left = '100%';
	});
	imgs[0].style.left = 0;
	imgs[0].style.zIndex = 99;
	function move(way ='left'){
		if(way == "left"){
			j = i + 1;
			if(j >= imgs.length){
				j = 0;
			}
			imgs[j].style.left = - width +'px';
			animate(imgs[i],{left: width},500);
		}else if(way == "right"){
			j = i-1;
			if(j<0){
				j = imgs.length - 1;
			}
			imgs[j].style.left = width +'px';
			animate(imgs[i],{left: - width},500);
		}
		animate(imgs[j],{left: 0},500,function(){
			flag = true;
		});
		circles.forEach((val)=>{
			val.classList.remove('active');
		});
		circles[j].classList.add('active');
		i = j;
	}
	//时间间隔函数
	let time = setInterval(move,1500);
	box.onmouseover = function(){
		clearInterval(time);
	};
	box.onmouseout = function(){
		time = setInterval(move,1500);
	};
	//左边
	let left = document.querySelector('.bDcenter a.left');
	left.onclick = function(){
		if(flag){
			flag = false;			
			move('right');
		}
	}
	let right = document.querySelector('.bDcenter a.right');
	right.onclick = function(){
		if(flag){
			flag = false;
			move();
		}
	}
	circles.forEach((val,index)=>{
		val.onclick = function(){
			if(index > i){
				imgs[index].style.left = "-100%";
				animate(imgs[i], {left: width}, 500);
				animate(imgs[index], {left: 0}, 500);
				circles.forEach((val)=>{
					val.classList.remove('active');
				});
				circles[index].classList.add('active');
			}else if(index < i){
				imgs[index].style.left = "100%";
				animate(imgs[i], {left: - width}, 500);
				animate(imgs[index], {left: 0}, 500);
				circles.forEach((val)=>{
					val.classList.remove('active');
				});
				circles[index].classList.add('active');
			}
			i = index;
		}
	});
	
	//下輪播
	let sco = document.querySelector('.scroll .sco');
	let real = document.querySelector('.scroll .real');
	let imgsco = document.querySelectorAll('.real .box');
	let widt = imgsco[0].offsetWidth;
	dian(sco,real,imgsco,widt);
	
	//公告
	let notice = document.querySelector('.notice ul');
	let n = document.querySelector('.notice');
	let noticelis = document.querySelectorAll('.notice ul li');
	let no_i = 0;
	let no_j = no_i+1;
	noticelis.forEach((val)=>{
		val.style.display = 'none';
	});
	noticelis[no_i].style.display = 'block';
	noticelis[no_j].style.display = 'block';
	function mo(){
		if(no_i>=noticelis.length-2){
			no_i = 0;
		}
		no_i++;
		no_j = no_i+1;
		noticelis.forEach((val)=>{
			val.style.display = 'none';
		});
		noticelis[no_i].style.display = 'block';
		noticelis[no_j].style.display = 'block';	
	}
	let t = setInterval(mo,1500);
	n.onmouseover = function(){
		clearInterval(t);
	}
	n.onmouseout = function(){
		t = setInterval(mo,1500);
	}
	let nleft = document.querySelector('.cleft');
	nleft.onclick = function(){
		mo();
	}
	let nright = document.querySelector('.cright');
	nright.onclick = function(){
		if(no_i <= 0){
			no_i = noticelis.length-2;
		}
		no_i--;
		no_j = no_i+1;
		noticelis.forEach((val)=>{
			val.style.display = 'none';
		});
		noticelis[no_i].style.display = 'block';
		noticelis[no_j].style.display = 'block';	
	}
}