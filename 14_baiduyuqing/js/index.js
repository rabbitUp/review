$(function(){
	$('#fullpage').fullpage({
    	scrollingSpeed:1000,   //滚动速度
    	sectionsColor:['#2E93E1','url(../img/bg-2.jpg)','red','yellow'],
		navigation: true,
    	navigationTooltips:['登陆百度舆情','领先：数据收集与处理','全面：舆情分析逻辑与架构','专业数据可视化'],
    	onLeave:function(next, index){
    		if(index == 1){
    			$('.ship').css('left','340px');
    			$('.navRight a:first-child').css('opacity',0);
    		}
    		if(index != 1){
    			$('.ship').removeAttr('style');
    			$('.navRight a:first-child').css('opacity',1);
    			$('.left').css({opacity:0.,transform:'translateX(-10px)',transition:'all .5s'});
	    		$('.right').css({opacity:0,transform:'translateX(10px)',transition:'all .5s'});
    		}
    	},
    	afterLoad:function(val,index){
    		if(index == 2 || index == 3){
    			$('.left').css({opacity:1,transform:'translateX(10px)',transition:'all 1s'});
	    		$('.right').css({opacity:1,transform:'translateX(-10px)',transition:'all 1s'});
    		}
    		if(index = 3){
    			$('.left').css({opacity:1,transform:'translateX(10px)',transition:'all .5s'});
	    		$('.right').css({opacity:1,transform:'translateX(-10px)',transition:'all .5s'});
    		}
    	}
   	});
	   //小图标点击事件
	$('div.down a').click(function(){
		$.fn.fullpage.moveSectionDown();
	});
});
