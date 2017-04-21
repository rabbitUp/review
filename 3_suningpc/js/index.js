window.onload = function() {
	// 头部广告
	let ad = document.querySelector('header .ad-top a img');
	let onOff = document.querySelector('header .ad-top .on-off');
	let flag = true;
	onOff.onclick = function() {
			if (flag) {
				ad.style.display = "none";
				this.classList.remove('on-off');
				this.classList.add('on-next');
				flag = false;
			} else {
				this.classList.remove('on-next');
				this.classList.add('on-off');
				ad.style.display = "block";
				flag = true;
			}
		}
		// 头部广告结束
		// 搜索栏点击事件
	let searchParent = document.querySelectorAll('.ban-box-riTop');
	for (let i = 0; i < searchParent.length; i++) {
		clickSearch(searchParent[i])
	}

	function clickSearch(parent) {
		let search = parent.querySelector('input');
		let search_con = parent.querySelector('.searchBox');
		let search_on = parent.querySelector('.searchBox b');
		search.onclick = function() {
			search_con.style.display = "block";
		}
		document.body.onclick = function(e) {
			if (e.target != search) {
				search_con.style.display = "none";
			}
		}
		search_on.onclick = function() {
			search_con.style.display = "none";
		}
	}
	// 搜索栏结束
	// 菜单栏
	let men = document.querySelectorAll('.ban-boLeft');
	function menu(parent) {
		let lists = parent.querySelectorAll('.banList');
		let stu = parent.querySelectorAll('ul li');
		hover(parent, function() {
			lists.forEach((value) => {
				value.style.display = 'block';
				animate(value,{width:998},0);
			});
		}, function() {
			lists.forEach((value, index) => {
			  animate(value,{width:20},1000, function () {
            value.style.display = 'none';
        });
				stu[index].classList.remove('a');
			});
		});
		tab('.ban-boLeft ul li', 'a', '.ban-boLeft .banList');
		stu.forEach((value) => {
			value.classList.remove('a');
		});
	}
	for (let i = 0; i < men.length; i++) {
		menu(men[i]);
	}
	// 菜单栏结束
	// 峰聚48小时左右滑动
	let hours = document.querySelectorAll('.hour-box ul');
	let hLeft = document.querySelector('.hour-box .left');
	let hRight = document.querySelector('.hour-box .right');
	let h_i = 0;
	let h_j = 0;
	let hWidth = hours[0].offsetWidth;

	hours.forEach((value, index) => {
		value.style.left = -hWidth + 'px';
	});
	hours[0].style.left = 0;
	hLeft.onclick = function() {

		h_i = h_j + 1;
		if (h_i >= hours.length) {
			h_i = 0;
		}
		hours[h_i].style.left = -hWidth + 'px';
		animate(hours[h_j], {
			left: hWidth
		}, 500);
		animate(hours[h_i], {
			left: 0
		}, 500);
		h_j = h_i;
	}
	hRight.onclick = function() {
			h_i = h_j - 1;
			if (h_i < 0) {
				h_i = hours.length - 1;
			}
			hours[h_i].style.left = hWidth + 'px';
			animate(hours[h_j], {
				left: -hWidth
			}, 500);
			animate(hours[h_i], {
				left: 0
			}, 500);
			h_j = h_i;
		}
		// 左右滑动结束
		// 轮播图
	let banner = document.querySelector('.banner-bottom');

	bannerImg(banner, '.ban-boCen a', '.ban-boCen ul li', '.ban-boCen', 4000);
	// 轮播图结束
	// 选项卡
	// 头部的选项卡
	tab('.ban-boRiBox-top a', 'tou', 'ul.ban-boRiBox-bottom');
	// 中间必抢清单选项卡
	tab('.likeM-botop a', 'likecolor', '.likeM-botom .like-bobom');
	// 楼层选项卡
	let floors = document.querySelectorAll('section.floor');
	for (let i = 0; i < floors.length - 1; i++) {
		tab_Z(floors[i]);
	}
	// 楼层轮播图
	let sBan = document.querySelectorAll('.move');
	for (let i = 0; i < 11; i++) {
		bannerImg_no(sBan[i], '.floor-boCen-top a', '.floor-boCen-top ul li', '.floor-boCen-top');
	}

	// 楼层跳转
	/**
	 * [goTo description]
	 * @button  {[string]} button [左边点击的一个个小框框]
	 * @floors  {[string]} floors [要处理的楼层]
	 * @butBox  {[string]} butBox [包着按钮的左侧菜单栏]
	 */
	function goTo(button, floors, butBox) {
		button = document.querySelectorAll(button);
		floors = document.querySelectorAll(floors);
		butBox = document.querySelector(butBox);
		let float = document.querySelector('.float');
		let ban = document.querySelector('.hour');
		let banHeight = ban.offsetTop;
		let flag = true;

		let screenTop = document.documentElement.clientHeight;
		/**
		 * 获取每个楼层的距离,用longArr存储
		 */
		let longArr = [...floors].map(function(value) {
			return value.offsetTop;
		});
		window.onscroll = function() {
			// 设置滚动的实时距离
			let scrollTop;
			// 兼容性问题
			document.body.scrollTop ? scrollTop = document.body.scrollTop : scrollTop = document.documentElement.scrollTop;
			// 当滚动的高度大于第一个元素距离顶部的距离减去可视窗口的距离的时候，让左边菜单显示
			if (scrollTop > longArr[0] - screenTop - 100) {
				butBox.style.display = "block";
			} else {
				butBox.style.display = "none";
			}
			if (scrollTop > banHeight) {
				float.style.display = "block";
			} else {
				float.style.display = "none";
			}
			// 判断滚动的位置，当滚动的高度大于屏幕高度时，添加相应的类名
			if (flag) {
				for (let i = 0; i < longArr.length; i++) {
					if (scrollTop > longArr[i] - 100) {
						button.forEach((value) => {
							value.classList.remove('color');
						});
						button[i].classList.add('color');
					}
				}
			}
			// 点击对应按钮，跳转对应楼层
			button.forEach((value, index) => {
				value.onclick = function() {
					if (flag) {
						flag = false;
						button.forEach((value) => {
							value.classList.remove('color');
						})
						animate(document.body, {
							scrollTop: longArr[index] - 50
						}, 500, function() {
							flag = true;
						});
						animate(document.documentElement, {
							scrollTop: longArr[index] - 50
						}, 500, function() {
							flag = true;
						});
						button[index].classList.add('color');
					}
				}
			})
		}
	}
	goTo('section.left a', '.floor', 'section.left');

	// 跳转回头
	let top = document.querySelector('.top');
	let flag_top = true;
	top.onclick = function() {
		if (flag_top) {
			flag_top = false;
			animate(document.body, {
				scrollTop: 0
			}, 500, function() {
				flag_top = true;
			});
		}
	}


}