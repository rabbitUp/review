window.onload = function() {
	/**
	 * 创建游戏的类
	 */
	class Game {
		/**
		 * [constructor]
		 */
		constructor(box) {
			// 该游戏创建的画布
			this.box = box;
			// 定义移动的初始方向
			this.way = "right";
			// 定义蛇的初始位置
			this.snake = [{
				x: 0,
				y: 0
			}, {
				x: 1,
				y: 0
			}, {
				x: 2,
				y: 0
			}];
			// 定义食物的初始化
			this.food = 0;
			this.x = 0;
			this.y = 0;
			this.i = 0;
		}
		// 创建画布
		drawScreen() {
			// 通过两个for循环进行div的创建
			for (let i = 0; i < 20; i++) {
				for (let j = 0; j < 20; j++) {
					let div = document.createElement('div');
					// 给div创建对应的id
					div.id = 'c' + j + '-' + i;
					// 给box中添加有了id的div
					this.box.appendChild(div);
				}
			}
		}
		// 画蛇
		drawSnake() {
			// 将构造函数中定义的数组的蛇放在浏览器中
			this.snake.forEach((obj) => {
				// 获取对应的dom对象
				let domObj = document.querySelector('#c' + obj.x + '-' + obj.y);
				// 给对应dom的类中添加she的类名
				domObj.className = 'she';
			});
		}
		// 得到食物
		getFood() {
			// 将math进行解构赋值
			let {
				random: ran,
				floor: f
			} = Math;
			// 将定义的x和y进行0-20的随机数的赋值
			// 只有生成的x和y和蛇的身子不在一起的时候，才不重新赋值
			do {
				this.x = f(ran() * 20);
				this.y = f(ran() * 20);
			} while (this.check(this.x, this.y, this.snake));
			// 定义一个domobj用来获取生成的食物的位置
			let domObj = document.querySelector('#c' + this.x + '-' + this.y);
			// 给生成的domobj上添加食物显示的颜色
			domObj.className = 'food';
			//在对象中将食物进行保存
			this.food = {
				x: this.x,
				y: this.y
			}
		}
		// 检测a和b两个元素在不在arr数组上
		check(a, b, arr) {
			// 用arr.some来判断，当a和b在arr中的时候，就返回true
			return arr.some((obj) => {
				return obj.x == a && obj.y == b;
			});
		}
		// 蛇的移动
		move() {
			// 定义一个时间处理函数
			let t = setInterval(() => {
				// 定义old为原来蛇的头
				let old = this.snake[this.snake.length - 1];
				// 定义新的蛇头
				let newC;
				// 判断蛇移动的方向
				switch (this.way) {
					// 当way的值是right
					case "right":
						// 将old中的x加一，y不变，赋值给newC
						newC = {
							x: old.x + 1,
							y: old.y
						};
						break;
						// 同上
					case "left":
						newC = {
							x: old.x - 1,
							y: old.y
						};
						break;
						// 同上
					case "top":
						newC = {
							x: old.x,
							y: old.y - 1
						};
						break;
						// 同上
					case "bottom":
						newC = {
							x: old.x,
							y: old.y + 1
						};
						break;
				}
				// 定义蛇的新头为domObj对象
				let newHead = document.querySelector('#c' + newC.x + '-' + newC.y);
				// 当newHead的值为空(越界)或生成的新蛇头的位置和蛇的位置重合时，判定游戏结束，清除时间进程函数
				if (newHead == null || this.check(newC.x, newC.y, this.snake)) {
					alert('game over!');
					clearInterval(t);
					return;
					// 将新蛇头在浏览器中画出来
				} else {
					newHead.className = 'she';
					// 将这个蛇头的x和y分别存储在蛇中
					this.snake.push(newC);
				}
				// 吃到食物
				// 当该蛇头的x和食物的x相等的同时该蛇头的y和食物的y相等，重新对食物进行赋值
				if (newC.x == this.x && newC.y == this.y) {
					this.food = this.getFood();
					this.i++;
					let grade = document.querySelector('.chengji');
					grade.innerHTML = this.i;
				} else {
					// 定义一个weiB，用来获取该蛇的尾巴在文档流中的位置
					let weiB = document.querySelector('#c' + this.snake[0].x + '-' + this.snake[0].y);
					// 将尾巴的类名去掉，即去尾
					weiB.className = '';
					// 同时,将蛇尾从该蛇的开头去掉
					this.snake.shift();
				}
			}, 120);
		}
		// 键盘按下事件
		onkeydown() {
			// 键盘监听事件
			document.onkeydown = (e)=> {
				// 用switch来判断按下的键盘是哪一个
				switch (e.keyCode) {
					// 左
					case 37:
						// 如果当前的方向是向右的,则不能向左
						if (this.way == "right") {
							return;
						};
						this.way = "left";
						break;
					// 下
					case 38:
						// 同理
						if (this.way == "bottom") {
							return;
						};
						this.way = "top";
						break;
					// 右
					case 39:
						// 同理
						if (this.way == "left") {
							return;
						};
						this.way = "right";
						break;
					// 上
					case 40:
						// 同理
						if (this.way == "top") {
							return;
						};
						this.way = "bottom";
						break;
				}
			}
		}
		play() {
			this.drawScreen();
			this.drawSnake();
			this.getFood();
			this.move();
			this.onkeydown();
		}
	}
	let box = document.querySelector('#box');
	let newGame = new Game(box);
	newGame.play();
}