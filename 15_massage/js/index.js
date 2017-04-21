window.onload = function() {
	let write = document.querySelector('.write textarea');
	let button = document.querySelector('button');
	let content;
	let con = document.querySelector('.content');
	let span =document.querySelectorAll('span');
	write.innerHTML ="";
	document.onkeydown = function(e) {
		content = write.value;
		let length = content.length;
		span[0].innerHTML = length;
		span[1].innerHTML = 40 - length;
		if(length >= 40){
			write.value=content.substr(0,40);
		}
		if(e.ctrlKey && e.keyCode ===13){
			sub();
		}
	}
	button.onclick =sub;
	function sub() {
		if(content){
			write.value="";
			let li = document.createElement('p');
			li.innerHTML=content;
			con.appendChild(li);
			span[0].innerHTML =0;
			span[1].innerHTML =40;
		}else{
			alert("输入内容不能为空");			
		}
	}
		
}