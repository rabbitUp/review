'use strict';
//轮播图
$(document).ready(function () {
  /**
   * 轮播图
   * @param box   盒子
   * @param imgs  图片
   * @param handleR 右把手
   * @param handleL 左把手
   * @param circles 小圆点
   */
  function bannerO(box,imgs,handleR,handleL,circles) {
    let i = 0;
    let flag = true;
    function move() {
      $(imgs).eq(i).fadeTo(1000,0, function () {
        flag = true;
      });
      $(circles).eq(i).removeClass('color');
      i++;
      if(i >$(imgs).length-1){
        i=0;
      }
      $(imgs).eq(i).fadeTo(1000,1);
      $(circles).eq(i).addClass('color');
    }
    let t = setInterval(move,2000);
    $(box).on('mouseover', function () {
      clearInterval(t);
    });
    $(box).on('mouseout', function () {
      t = setInterval(move,2000);
    });
    $(handleR).on('click', function () {
      if(flag) {
        move();
        flag = false;
      }
    });
    $(handleL).on('click', function () {
      if(flag) {
        moveL();
        flag = false;
      }
    });
    function moveL() {
      $(imgs).eq(i).fadeTo(1000,0, function () {
        flag = true;
      });
      $(circles).eq(i).removeClass('color');
      i--;
      if(i <0){
        i=$(imgs).length-1;
      }
      $(imgs).eq(i).fadeTo(1000,1);
      $(circles).eq(i).addClass('color');
    }
    let ti;
    $(circles).each(function (index,val) {
      $(val).on('mouseover', function () {
        ti = setTimeout(function () {
          $(imgs).eq(i).fadeTo(1000,0);
          $(circles).eq(i).removeClass('color');
          $(circles).eq(index).addClass('color');
          $(imgs).eq(index).fadeTo(1000,1);
          i = index;
        },200);
      });
      $(val).on('mouseout', function () {
        clearTimeout(ti);
      });
    });
  }
  //轮播图
  bannerO('.imgban','.imgban a','section.right','section.left','.imgban code > code');
});
//头部选项卡
$(document).ready(function () {
  $('.bottom-box-left > ul.ula').on('mouseover',function () {
    $('.bottom-box-left > ul.ula div.downa').css({opacity:1,height:230});
  });
  $('.bottom-box-left > ul.ula').on('mouseout',function () {
    $('.bottom-box-left > ul.ula div.downa').css({zIndex:102,height:0});
  });
  $('.bottom-box-left > ul.ula >li.lia').on('mouseover', function () {
    $('.bottom-box-left > ul.ula div.downa').css({zIndex:101});
    $(this).children().eq(1).css({zIndex:102});
  });
});
//小米明星单品
$(document).ready(function () {
  let flag = true;
  let $flag = false;
  let time = setInterval(function () {
    right();
    left();
  },5000);
  $('.star-box-right a.right').next().css({pointerEvents:'none'});
  $('.star-box-right a.right').on('click', right);
  function right() {
    if(flag){
      flag = false;
      $('.star-box-right a.right').css({pointerEvents:'none',opacity:0.5});
      $('.star-box-right a.right').next().removeAttr('style').css('opacity',1);
      $('.boxStar .star-bottom').eq(0).animate({left:'-100%'},1000,'swing', function () {
        $flag = true;
      });
      $('.boxStar .star-bottom').eq(1).animate({left:0},1000,'swing');
    }
  }
  $('.star-box-right a.left').on('click', left);
  function left() {
    if($flag){
      $flag = false;
      $('.star-box-right a.left').css({pointerEvents:'none',opacity:0.5});
      $('.star-box-right a.left').prev().removeAttr('style').css('opacity',1);
      $('.boxStar .star-bottom').eq(0).animate({left:0},1000,'swing', function () {
        flag = true;
      });
      $('.boxStar .star-bottom').eq(1).animate({left:'100%'},1000,'swing');
    }
  }
  $('.star-box-right a').on('mouseout', function () {
    time = setInterval(function () {
      right();
      left();
    },5000);
  });
  $('.star-box-right a').on('mouseover', function () {
    clearInterval(time);
  });
});
//选项卡
window.onload = function () {
  let match = document.querySelectorAll('.match');
  for (let i = 0; i < match.length; i++) {
    tab_Z(match[i]);
  }
  function moveMatter(parent){
    let mRight = parent.querySelector('.right');
    let mimgs = parent.querySelectorAll('figure');
    let circle = parent.querySelectorAll(' div a');
    let mWidth = mimgs[0].offsetWidth;
    let mi = 0;
    mimgs.forEach((val)=>{
      val.style.left = mWidth + 'px';
    });
    mimgs[0].style.left = 0;
    mRight.onclick = right;
    function right(){
      if(mi>mimgs.length-2){
        return;
      }
      animate(mimgs[mi],{left: - mWidth*2},200);

      animate(mimgs[mi+1],{left: 0},200);
      circle.forEach((val)=>{
        val.classList.remove('active');
      });
      circle[mi+1].classList.add('active');
      mi++;
    }
    let mLeft = parent.querySelector('.left');
    mLeft.onclick = left;
    function left(){
      if(mi<=0){
        return;
      }
      animate(mimgs[mi],{left: mWidth*2},200);
      animate(mimgs[mi-1],{left: 0},200);
      circle.forEach((val)=>{
        val.classList.remove('active');
      });
      circle[mi-1].classList.add('active');
      mi--;
    }
    circle.forEach((val,index)=>{
      val.onclick=function(){
        if(index>mi){
          right();
        }else{
          left();
        }
        mi = index;
      }
    });
  }
  let tar = document.querySelectorAll('.matter li');
  tar.forEach((val)=>{
    moveMatter(val);
  });
};
//为你推荐
$(document).ready(function () {
  $('.for .star-top a.lef').css({pointerEvents:'none'});
  let i = 0;
  $('.for-you').css({left:'100%'}).eq(0).css({left:0});
  $('.for .star-top a.righ').on('click', function () {
    if(i < $('.for-you').length-2){
      $('.for .star-top a.lef').removeAttr('style').css({opacity:1});
    }else{
      $(this).css({pointerEvents:'none',opacity:0.5});
    }
    $('.for-you').eq(i).animate({left:'-100%'},1000);
    $('.for-you').eq(i+1).animate({left:0},1000);
    i++;
    if(i == 3){
      i = 3;
    }
  });
  $('.for .star-top a.lef').on('click', function () {
    if(i>1){
      $('.for .star-top a.righ').removeAttr('style').css({opacity:1});
    }else{
      $(this).css({pointerEvents:'none',opacity:0.5});
    }
    $('.for-you').eq(i).animate({left:'100%'},1000);
    $('.for-you').eq(i-1).animate({left:0},1000);
    i--;
    if(i == 0){
      i = 0;
    }
  });
});
