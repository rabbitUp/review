/**
 * 设置Cookie
 * @param {string} name  [Cookie的名字]
 * @param {string} value [Cookie的值]
 * @param {string} time  [Cookie生存周期]
 */
function setCookie(name,value,time){
	if(time){
		time = new Date();
		time.setTime(time.getTime() + time*1000);
		document.cookie = name +'='+ value+'; expires='+time.toGMTString();
	}else{
		document.cookie = name +'='+ value;
	}
}
/**
 * 得到对应Cookie
 * @param  {string} name 要查找的Cookie的名字
 * @return {boolean}     是否存在对应Cookie的值,若没有，则返回false
 */
function getCookie(name){
	let arr = document.cookie.split('; ');
	for(let i=0; i<arr.length ;i++){
		if(arr[i].split('=')[0] == name){
			return arr[i].split('=')[1];
		}
	}
	return false;
}
/**
 * 删除Cookie
 * @param  {string} name Cookie的名字
 * @return {boolean}     是否成功删除,不成功,则返回false
 */
function delCookie(name){
	let arr = document.cookie.split('; ');
	for(let i=0; i<arr.length ;i++){
		if(arr[i].split('=')[0] == name){
			let time = new Date();
			time.setTime(time.getTime() - 1);
			document.cookie = arr[i].split('=')[0] +'=hello; expires='+time.toGMTString();
		}
	}
	return false;
}