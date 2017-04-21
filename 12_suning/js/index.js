window.onload = function(){
	let nav = document.querySelector('.nav');
//	console.log(nav.offsetTop);
	window.onscroll = function(e){
		let dtop = document.body.scrollTop;
		if(dtop > nav.offsetTop){
			nav.style.position = "fixed";
			nav.style.top = 0 + 'px';
		}else{
			nav.removeAttribute('style');
		}
	}
}