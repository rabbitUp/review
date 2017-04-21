window.onload=function(){
	// 基础数据库
//	let database = [
//		{id:0,class:'001',num:001,name:'张三',grade:80},
//		{id:1,class:'001',num:002,name:'李四',grade:79},
//		{id:2,class:'001',num:003,name:'王五',grade:87},
//	];
//	localStorage.database = JSON.stringify(database);
	////////////////////////////////基础数据库
	//将数据库中的数据放在页面中
	let database = JSON.parse(localStorage.database);
	let tbody = document.querySelector('tbody');
	//在页面中添加相应的值
	for(let i=0;i<database.length;i++){
		let tr = document.createElement('tr');
		tr.setAttribute('index',database[i].id);
		tr.innerHTML = `
		<td class='class'>${database[i].class}</td>
		<td class='num'>${database[i].num}</td>
		<td class='name'>${database[i].name}</td>
		<td class='grade'>${database[i].grade}</td>
		<td><div class="del">删除</div></td>
		`;
		tbody.appendChild(tr);
	}
//	//添加元素
	let add = document.querySelector('#add');
	add.onclick = function(){
		//页面中添加一行
		let tr = document.createElement('tr');
		let num ;
		if(database[database.length-1]){
			tr.setAttribute('index',database[database.length-1].id+1);
			num = database[database.length-1].num+1;
		}else{
			tr.setAttribute('index',0);
			num = 1;
		}
		tr.innerHTML = `
		<td class='class'></td>
		<td class='num'>${num}</td>
		<td class='name'></td>
		<td class='grade'></td>
		<td><div class="del">删除</div></td>
		`
		tbody.appendChild(tr);
		//数据库中相对应添加一行
		let obj = {}
		if(database.length){
			obj.id = database[database.length-1].id+1;			
			obj.num = database[database.length-1].num+1;
		}else{
			obj.id = 0;
			obj.num =1;
		}
		obj.class = '';
		obj.name = '';
		obj.grade = 100;
		database.push(obj);
		localStorage.database = JSON.stringify(database);
	}
	//删除对应行
	tbody.onclick = function(e){
		let tar = e.target;
		if(tar.nodeName == 'DIV'){
			if(confirm('是否删除该生信息？')){
				let parent = tar.parentNode.parentNode;
				tbody.removeChild(parent);
				let parIndex = parent.getAttribute('index');
				//在数据库中对应删除
				database.forEach((val,index)=>{
					if(index == parIndex){
						database.splice(index,1);
					}
				});
				localStorage.database = JSON.stringify(database);
			}
		}else if(tar.className != ''){
			//添加input
			let input = document.createElement('input');
			let content = tar.innerHTML;
			input.value = content;
			tar.innerHTML = '';
			tar.appendChild(input);
			input.focus();
			input.onblur = function(){
				if(input.value == null||input.value == content){
					tar.innerHTML = content;
				}else{
					tar.innerHTML = input.value;
				}
				//在数据库中相应更改
				let par = tar.parentNode;
				let parIndex = par.getAttribute('index');
				if(tar.className == 'num'){
					database[parIndex].num = tar.innerHTML;
				}
				if(tar.className == 'class'){
					database[parIndex].class = tar.innerHTML;
				}
				if(tar.className == 'grade'){
					database[parIndex].grade = tar.innerHTML;
				}
				if(tar.className == 'name'){
					database[parIndex].name = tar.innerHTML;
				}
				input = null;
				localStorage.database = JSON.stringify(database);
			}
		}
	}
}