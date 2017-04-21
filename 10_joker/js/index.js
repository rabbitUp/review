$(document).ready(function(){
	//扑克牌
	let joker = [];   
	function jok(){
		//花色
		let floData = ['c','d','s','h'];
		//用来检测是否生成对应花色的牌
		let test = [];
		//循环生成扑克牌
		while(joker.length<52){
			//创建num用来生成点数
			num = Math.ceil(Math.random()*13);
			//创建flower用来生成花色
			let flower = floData[Math.floor(Math.random()*4)];
			//判断当没有该种花色的牌的时候，将生成的对应的键值对存放在test中，同时将生成的牌放入joker数组
			if(!test[num+'~'+flower]){
				test[num+'~'+flower] = true;
				joker.push({num,flower});
			}
		}
		//将扑克放入ul中
		let n = 0;
		for(let i = 0; i<7;i++){
			for(let j = 0 ;j<i+1;j++){
				$('<li class = "joker">').attr('id',i+'_'+j).attr('value',`${joker[n].num}`).css('background',`url(img/${joker[n].num}${joker[n].flower}.png)`).delay(n*50).animate({
					left:300-50*i+100*j,
					top: 50*i,
					opacity:1,
				},100).appendTo('ul');
				n++;
			}
		}
		//将剩下的牌放在左下角
		for(;n<52;n++){
			$('<li class = "joker no">').attr('id','7_'+n).attr('value',`${joker[n].num}`).css('background',`url(img/${joker[n].num}${joker[n].flower}.png)`).delay(n*50).animate({
					left:100,
					top: 460-n/5,
					opacity:1,
				},100).appendTo('ul');
		}
		//点击事件
		let grade = null;
		$('li').click(function(){
			let x = $(this).attr('id').split('_')[0];  //
			let y = $(this).attr('id').split('_')[1];  //
			if(x < 6){
				if($('#'+`${parseInt(x)+1}_${y}`).length == 1 || $('#'+`${parseInt(x)+1}_${parseInt(y)+1}`).length == 1){
					return;
				}
			}
			$(this).toggleClass('active');
			if(!grade){
				grade = $(this).attr('value');
				if(parseInt(grade)=== 13){
					$('.active').animate({
						left:500,
						top:0,
						opacity:0
					},500,function(){
						$('.active').remove();
						grade = null;
					});
				}
			}else{
				let next = parseInt($(this).attr('value'));
				if( next + parseInt(grade) === 13){
					$('.active').animate({
						left:500,
						top:0,
						opacity:0
					},500,function(){
						$('.active').remove();
						grade = null;
					});
				}else{
					setTimeout(function(){
						$('.active').removeClass('active');
					},400);
					grade = null;
				}
			}
			if($('li').length == 2){
				alert('游戏成功！');
			}
		});
		//往左边
		let index = 1;
		$('.left').click(function(){
			$('.no').last().removeClass('no').addClass('now').css('z-index',index++).animate({
				left:500,
			},1000);
		});
		$('.right').click(function(){
			$('.now').removeClass('now').addClass('no').each(function(index){
				$(this).delay(index*50).css('z-index',0).animate({
					left:100,
				},1000);
			})
		});
	}
	//按钮
	$('button').eq(0).click(function(){
		$('ul').empty();
		$('#box').hide();
		$('h1').hide();
		$('button').hide();
		$(this).removeAttr('id').html('重新开始').show().addClass('start');
		jok();
	});
	$('button').eq(1).click(function(){
		if(!$('h1').children().is('div')){
			$('<div>').css({
				fontSize:16+'px',
				textAlign:'center',
				color: '#fff'
			}).html('点击纸牌，当点击的两张纸牌的点数相加为13时消除。').appendTo('h1');
		}
	});
});