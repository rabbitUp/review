function tab_Z(parent) {
  // 选项卡上的字
  let floorHeads = parent.querySelectorAll('.match-top ul li');
  //
  let font = parent.querySelectorAll('.match-top ul li a');
  // 下面的图片
  let boxUl = parent.querySelectorAll('.hardware-right');
  let delay;
  let wid= font.length-1;
  // 将第一个图片的设置显示
  boxUl[wid].style.zIndex = 20;
  font[wid].classList.add('matfont');
  [...floorHeads].forEach((value, index) => {
    value.onmouseover = function() {
      delay = setTimeout(function() {
          [...boxUl].forEach((value, index) => {
            value.style.zIndex = 10;
            font[index].classList.remove('matfont');
          });
          boxUl[index].style.zIndex = 20;
          font[index].classList.add('matfont');
        }
        ,200
      );
    }
    value.onmouseout = function() {
      clearTimeout(delay);
    }
  });
};
