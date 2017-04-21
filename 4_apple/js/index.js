//苹果下部界面
$(document).ready(function(){
	//列表
		$(window).resize(function(){
			if($('body').width()<735){
				$('.smallBox').hide();
				$($('footer .footer-bottom ul li:first-child').nextAll()).hide();
				$('footer .footer-bottom ul li:first-child').off();
				$('footer .footer-bottom ul li:first-child').on('click',function(){
					$($(this).nextAll()).stop().slideToggle(200);
					if(parseInt($($(this).next()).css('height')) == 1){
						$(this).children().last().css({transform:'rotate(45deg)'});
					}else{
						$(this).children().last().css({transform:'none'});
					}
				});
			}else{
				$('.smallBox').hide().children().removeClass('toggle');
				$('footer .footer-bottom ul li:first-child').off();
				$($('footer .footer-bottom ul li:first-child').nextAll()).show();
			}
		});
		$(window).triggerHandler('resize');
});
//头部
$(document).ready(function(){
	$('.smallBox li:last-child').on('click',function(){
		$(this).prevAll().slideUp('fast').end().css({color:'rgba(255,255,255,0.6)'});
		$('.small a:nth-child(2)').children().removeClass('icon-apple').addClass('icon-xiangshang-copy');
		$('.small a:nth-child(2)').click(function(){
			$('.smallBox li:last-child').prevAll().slideDown('fast');
			$(this).children().removeClass('icon-xiangshang-copy').addClass('icon-apple');
		});
	});
	//点击的按钮
	$('.small a:first-child').click(function(){
		$('.smallBox').slideToggle().children().toggleClass('toggle');
		$('.small a:last-child').toggleClass('move');
		$('html').toggleClass('hidden');
		$('body').toggleClass('hidden');
		if(parseInt($('.smallBox').css('height')) == 1){
			$(this).children().first().css({transform:'rotate(135deg)'});
			$(this).children().last().css({transform:'rotate(45deg)'});
		}else{
			$(this).children().removeAttr('style');
		}
	});
});
//轮播图
$(document).ready(function(){
	let now = 0, next = 0;
	let a = $('.banner code a');
	let back = $('section.banner');
	let imgs = $('.banner figure');
	let fonts = $('.banner figure figcaption');
	imgs.eq(0).css('display','block');
	let flag = true;
	a.on('animationend.end',function(){
		next = now +1;
		if(next > imgs.length-1){
			next = 0;
		}
		move();
		a.removeClass('active').eq(next).addClass('active');
		now = next;
	});
	function move(){
		imgs.removeClass();
		imgs.children().removeClass().removeAttr('style');
		imgs.removeAttr('style');
		imgs.eq(now).addClass('now-left-out');
		imgs.children().addClass('fonts');
		imgs.eq(next).addClass('zIndex next-left-in');
		switch (imgs.eq(now).attr('id')){
			case 'one':back.css('background','#0A0A0A');break;
			case 'two':back.css('background','#F2F2F2');break;
			case 'three':back.css('background','#FFFFFF');break;
		}
		imgs.eq(now).on('animationend',function(){
			flag = true;
		});
	}
	function movel(){
		next = now - 1;
		if(next < 0 ){
			next = imgs.length-1;
		}
		imgs.removeAttr('style');
		imgs.children().removeClass().removeAttr('style');
		imgs.removeClass();
		imgs.eq(now).on('animationend',function(){
			flag = true;
		});
		imgs.eq(now).addClass('zIndex next-left-out');
		imgs.children().addClass('nfonts');
		imgs.eq(next).addClass('now-left-in');
		switch (imgs.eq(next).attr('id')){
			case 'one':back.css('background','#0A0A0A');break;
			case 'two':back.css('background','#F2F2F2');break;
			case 'three':back.css('background','#FFFFFF');break;
		}
		now = next;
	}
	$('.banner p').eq(0).children().click(function(){
		if(flag){
			flag = false;
			a.off('animationend.end');
			movel();
			a.removeClass();
			a.removeClass('active').eq(next).addClass('ch');
		}
	});
	$('.banner p').eq(1).children().click(function(){
		if(flag){
			flag = false;
			next = now +1;
			if(next > imgs.length-1){
				next = 0;
			}
			move();
			now = next;
			a.removeClass();
			a.removeClass('active').eq(next).addClass('ch');
		}
	});
	a.click(function(){
		let h = $(this).index();
		if(h > now){
			imgs.removeClass();
			imgs.eq(now).addClass('now-left-out');
			imgs.eq(h).addClass('zIndex next-left-in');
			switch (imgs.eq(now).attr('id')){
				case 'one':back.css('background','#0A0A0A');break;
				case 'two':back.css('background','#F2F2F2');break;
				case 'three':back.css('background','#FFFFFF');break;
			}
		}else if(h < now){
			imgs.removeClass();
			imgs.eq(now).addClass('zIndex next-left-out');
			imgs.eq(h).addClass('now-left-in');
			switch (imgs.eq(h).attr('id')){
				case 'one':back.css('background','#0A0A0A');break;
				case 'two':back.css('background','#F2F2F2');break;
				case 'three':back.css('background','#FFFFFF');break;
			}
		}
		a.removeClass();
		a.removeClass('active').eq(h).addClass('ch');
		now = h;
	});
});
