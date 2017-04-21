//获得指定类名元素
/*思路:																		        1判断浏览器是否支持，若支持，使用原生函数，不支持，进行下一步；
	 	  document.getElementsByClassName
		2获取所有的元素；
		3元素的类名是否等于指定类名，若符合条件，则放在一个数组中；
		4返回数组。
*/
function getClass(classname, obj) {
	obj = obj || document; //定义该函数默认值为document
	if (obj.getElementsByClassName) {
		return obj.getElementsByClassName(classname);
		//如果可以使用原生函数，则直接返回
	} else {
		var objs = obj.getElementsByTagName('*'); //获取文档中所有标签名
		var arrObj = []; //定义一个数组用来存储匹配的类名
		for (var i = 0; i < objs.length; i++) {
			var checkArr = objs[i].className.split(" ");
			var result = checkClass(checkArr, classname);
			if (result) {
				arrObj.push(objs[i]); //如果类名匹配成功，则将该类名放入该数组中。
			}
		}
		return arrObj;
	}
}
// 判断数组中是否含有某个类名
// 参数  arr传入的类名数组
//       str要判断的类名
function checkClass(arr, str) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === str) {
			return true;
		}
	}
	return false;
}

// 获取样式  兼容性
// 参数 obj   对象
//      attr  样式
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
/**
 * 选项卡函数
 * name 要添加的动作的名字
 * nameClass 要添加的类
 * content 要改变的部分
 * num首先让第几个显示(可以为空)
 */
function tab(name, nameClass, content, num) {
	// 获取要操作的两个类
	name = document.querySelectorAll(name);
	content = document.querySelectorAll(content);
	// 默认选择第几个显示
	num = num || 0;
	let delay;
	// 初始化
	name[num].classList.add(nameClass);
	content[num].style.display = "block";
	// 循环添加鼠标移入事件
	[...name].forEach((value, index) => {
		value.onmouseover = function() {
			delay = setTimeout(
				function() {
					// 循环，将每一个要操作的类都初始化，都隐藏掉
					for (let i = 0; i < name.length; i++) {
						name[i].classList.remove(nameClass);
						content[i].style.display = "none";
					}
					// 给要变化的类进行样式的添加
					value.classList.add(nameClass);
					content[index].style.display = "block";
				}, 200
			);
		}
		value.onmouseout = function() {
			clearTimeout(delay);
		}
	})
}
/*
 *选项卡函数2号
 *参数  parent
 *作用  消除同一个类名操作上面下面同时动的情况
 */
// 选项卡，使用z-index的办法
function tab_Z(parent) {
	// 选项卡上的字
	let floorHeads = parent.querySelectorAll('.floor-head ul li a');
	// 选项卡的每个li
	let three = parent.querySelectorAll('.floor-head ul li');
	// 选项卡下的三角
	let span = parent.querySelectorAll('.floor-head ul li span');
	// 下面的图片
	let boxUl = parent.querySelectorAll('#bbox');
	let delay;
	// 将第一个图片的设置显示
	boxUl[0].style.zIndex = 20;
	[...three].forEach((value, index) => {
		value.onmouseover = function() {
			delay = setTimeout(function() {
				[...boxUl].forEach((value, index) => {
					value.style.zIndex = 10;
					floorHeads[index].classList.remove('a-color');
					span[index].classList.remove('span');
				});
				boxUl[index].style.zIndex = 20;
				floorHeads[index].classList.add('a-color');
				span[index].classList.add('span');
			}, 200);

		}
		value.onmouseout = function() {
			clearTimeout(delay);
		}
	});
};

// 封装轮播图
// 参数  bG      背景颜色  自己获取
// 		 content 要变化的图片
//       circles 小圆点
//       divs    包着的大框框 
//       bg-${i} 背景颜色设置的类
//       .color  圆点颜色
//       bannertime    轮播时间 默认时间为2s
function bannerImg(bG, content, circles, divs, bannertime) {
	// 要变化的图片
	content = bG.querySelectorAll(content);
	// 小圆点获取
	circles = bG.querySelectorAll(circles);
	// 计步器
	let i = 0;
	// 大背景bG
	// 最大的框框
	divs = bG.querySelector(divs);
	let flag = true;
	bannertime = bannertime || 2000;
	let time = setInterval(app, bannertime);
	// 时间间隔函数
	function app(way = "right") {
		if (way == "right") {
			i++;
			// 判断图片是否超出，若超出，则将i重新赋值为0
			if (i >= content.length) {
				i = 0;
			}
		} else if (way == "left") {
			if (i <= 0) {
				i = content.length;
			}
			i--;
		}
		// 对图片进行初始化操作
		[...content].forEach((value, index) => {
			value.style.opacity = 0;
			circles[index].classList.remove('color');
			bG.classList.remove(`bg-${index}`);
		});
		// 将要显示的图片和圆点进行变化
		content[i].style.opacity = 1;
		circles[i].classList.add('color');
		bG.classList.add(`bg-${i}`);
	}
	// 鼠标放入
	divs.onmouseover = function() {
		clearInterval(time);
	};
	// 鼠标移开
	divs.onmouseout = function() {
		time = setInterval(app, bannertime);
	};
	let delay;
	// 小圆点
	[...circles].forEach((value, index) => {
		value.onmouseover = function() {
			delay = setTimeout(function() {
				// 对小圆点进行初始化
				[...content].forEach((value, index) => {
					value.style.opacity = 0;
					circles[index].classList.remove('color');
					bG.classList.remove(`bg-${index}`);

				});
				// 当开关打开时，进行变化，同时将开关关闭
				content[index].style.opacity = 1;
				value.classList.add('color');
				bG.classList.add(`bg-${index}`);
				i = index;
			}, 200);
		};
		value.onmouseout = function() {
			clearTimeout(delay);
		}
	});
	// 选项卡
	// 获取左右选项卡
	let left = bG.querySelector('.left');
	let right = bG.querySelector('.right');

	right.onclick = function() {
		// 当开关打开时，进行变化的操作，同时将开关关掉
		if (flag) {
			flag = false;
			app();
		}
	};
	left.onclick = function() {
		// 当开关打开时，进行变化的操作，同时将开关关掉
		if (flag) {
			flag = false;
			app("left");
		}
	};
	// 给图片添加监听，当图片变换完毕后，将开关打开
	[...content].forEach((value, index) => {
		value.addEventListener('transitionend', function() {
			flag = true;
		});
	});
}
/**
 * 轮播图 不改变背景图片的
 * 参数  bG   大框框
 * 		 content 要改变的图
 * 		 circles 圆点
 * 		 divs   包着的类
 * 		 bannertime 动的时间
 */
function bannerImg_no(bG, content, circles, divs, bannertime) {
	// 要变化的图片
	content = bG.querySelectorAll(content);
	// 小圆点获取
	circles = bG.querySelectorAll(circles);
	// 计步器
	let i = 0;
	// 大背景bG
	// 最大的框框
	divs = bG.querySelector(divs);
	let flag = true;
	bannertime = bannertime || 2000;
	let time = setInterval(app, bannertime);
	// 时间间隔函数
	function app(way = "right") {
		if (way == "right") {
			i++;
			// 判断图片是否超出，若超出，则将i重新赋值为0
			if (i >= content.length) {
				i = 0;
			}
		} else if (way == "left") {
			if (i <= 0) {
				i = content.length;
			}
			i--;
		}
		// 对图片进行初始化操作
		[...content].forEach((value, index) => {
			value.style.opacity = 0;
			circles[index].classList.remove('color');
		});
		// 将要显示的图片和圆点进行变化
		content[i].style.opacity = 1;
		circles[i].classList.add('color');
	}
	// 鼠标放入
	divs.onmouseover = function() {
		clearInterval(time);
	};
	// 鼠标移开
	divs.onmouseout = function() {
		time = setInterval(app, bannertime);
	};
	let delay;
	// 小圆点
	[...circles].forEach((value, index) => {
		value.onmouseover = function() {
			delay = setTimeout(function() {
				// 对小圆点进行初始化
				[...content].forEach((value, index) => {
					value.style.opacity = 0;
					circles[index].classList.remove('color');
				});
				// 当开关打开时，进行变化，同时将开关关闭
				content[index].style.opacity = 1;
				value.classList.add('color');
				i = index;
			}, 200);
		};
		value.onmouseout = function() {
			clearTimeout(delay);
		}
	});
	// 选项卡
	// 获取左右选项卡
	let left = bG.querySelector('div .left');
	let right = bG.querySelector('div .right');

	right.onclick = function() {
		// 当开关打开时，进行变化的操作，同时将开关关掉
		if (flag) {
			flag = false;
			app();
		}
	};
	left.onclick = function() {
		// 当开关打开时，进行变化的操作，同时将开关关掉
		if (flag) {
			flag = false;
			app("left");
		}
	};
	// 给图片添加监听，当图片变换完毕后，将开关打开
	[...content].forEach((value, index) => {
		value.addEventListener('transitionend', function() {
			flag = true;
		});
	});
}