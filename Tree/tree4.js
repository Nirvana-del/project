var length = 5;
document.getElementById("reset").onclick = function () {
	window.location.reload();
}
// document.getElementsByClassName("pc")[0].onclick = function () {
// 	length = 10;
// 	console.log(length)
// }
// document.getElementsByClassName("ph")[0].onclick = function () {
// 	length = 5;
// 	console.log(length)
// }
let code = new Array();
let str = new Array();
let i = 0;
let x = 0;
let strA = new Array();
var text = document.querySelector('input');//输入结点
let huff = document.querySelector('.huff');//生成哈夫曼树
var huff_tree = document.querySelector('.huff_tree');//哈夫曼结点
var getNode = new Array();
var hafucode = document.querySelector('.hafucode');//哈夫曼编码
text.value = "9, 6, 2, 3, 7, 10, 8";
text.onfocus = function () {
	if (this.value == "9, 6, 2, 3, 7, 10, 8") {
		this.value = "";
	}
}
text.onblur = function () {
	if (this.value == "") {
		this.value = "9, 6, 2, 3, 7, 10, 8";
	}
}
document.addEventListener('keydown', function (e) {
	if (e.keyCode == 13) {
		fn();
		text.value = ' ';
	}
})

huff.addEventListener('click', fn)//生成哈夫曼树
function fn() {
	getNode = text.value.split(",");
	for (let i = 0; i < getNode.length; i++)
		getNode[i] = parseInt(getNode[i]);
	console.log(getNode);
	let tree = new huffmanTree(getNode);
	console.log(strA);
	console.log(code);
	// 实现位移
	for (let j = 0; j < strA.length - 1; j++) {
		var x = 120;
		var y = 60;
		let li = document.createElement('li');
		var ww = document.createElement("div");
		li.innerHTML = strA[j];
		ww.innerHTML = code[j];
		let cur = new Array();
		cur = code[j];
		let f = 1;
		for (var k = 0; k < cur.length; k++) {
			if (cur.length == 4) {
				if (cur[3] == '0') {
					ww.style.position = 'relative';
					ww.style.left = -0.9333 + 'rem';
					ww.style.top = -0.69 + 'rem';
				}
				if (cur[3] == '1') {
					ww.style.position = 'relative';
					ww.style.right = -0.9333 + 'rem';
					ww.style.top = -0.69 + 'rem';

				}
			}
			if (cur.length == 5) {
				if (cur[4] == '0') {
					ww.style.position = 'relative';
					ww.style.left = -0.9333 + 'rem';
					ww.style.top = -0.69 + 'rem';
				}
				if (cur[4] == '1') {
					ww.style.position = 'relative';
					ww.style.right = -0.9333 + 'rem';
					ww.style.top = -0.69 + 'rem';

				}
			}
			if (k == 0 && cur.length <= 3) {
				if (cur[k] == '0') {
					ww.style.position = 'relative';
					ww.style.right = 35 + 'px';
					ww.style.top = -25 + 'px';
				}
				if (cur[k] == '1') {
					ww.style.position = 'relative';
					ww.style.left = 35 + 'px';
					ww.style.top = -25 + 'px';

				}
			}
			y = y + 40;
			if (cur[k] == '0') {
				x = x - (20 * (7 - k) * f);
				f *= 2 / 3;
			}
			if (cur[k] == '1') {
				x = x + (20 * (7 - k) * f);
				f *= 2 / 3;
			}
		}
		li.style.top = y + 'px';
		li.style.left = x + 'px';
		huff_tree.appendChild(li);
		li.appendChild(ww);
	}
	let li = document.createElement('li');
	li.innerHTML = strA[strA.length - 1] + '';
	li.style.left = 120 + 'px';
	li.style.top = 60 + 'px';
	huff_tree.appendChild(li);

	// 根节点
	let a1 = [], a11 = [], a2 = [], a12 = [], a3 = [], a13 = [], a4 = [], a14 = [], a5 = [], a15 = [];
	let a21 = [], a22 = [], a23 = [], a24 = [], a25 = [];
	let last = huff_tree.children.length;
	// 实现位移
	for (let j = 0; j < code.length; j++) {
		if (code[j].length == 1) {
			a1.push(code[j]);
			a11.push(j);
		}

		if (code[j].length == 2) {
			a2.push(code[j]);
			a12.push(j);
		}
		if (code[j].length == 3) {
			a3.push(code[j]);
			a13.push(j);
		}
		if (code[j].length == 4) {
			a4.push(code[j]);
			a14.push(j);
		}
		if (code[j].length == 5) {
			a5.push(code[j]);
			a15.push(j);
		}
	}
	//动画实现
	let temp = 0, fl = 0;
	for (let k = 0; k < a4.length; k++) {
		for (let j = 0; j < a5.length; j++) {
			if (a4[k] === a5[j].slice(0, a4[k].length)) {
				setTimeout(function () {
					$(huff_tree.children[a15[j]]).fadeIn(1000, "linear");
				}, temp);
				temp += 1000;
				a25.push(a15[j]);
			}
		}
		if (a25[0])
			temp += 1000;
		for (let j = 0; j < a25.length; j++) {
			let temp2 = a25[j];
			setTimeout(function () {
				$(huff_tree.children[a14[k]]).fadeIn(1000, "linear", function () {
					$(huff_tree).append(drawLineA($(huff_tree.children[a14[k]]), $(huff_tree.children[temp2])));
				});
			}, temp);
			temp += 1000;
		}
		a25 = [];
	}
	temp += 1000;
	for (let k = 0; k < a3.length; k++) {
		for (let j = 0; j < a4.length; j++) {
			if (a3[k] === a4[j].slice(0, a3[k].length)) {

				setTimeout(function () {
					$(huff_tree.children[a14[j]]).fadeIn(1000, "linear");
				}, temp);
				temp += 1000;
				a24.push(a14[j]);
			}
		}
		if (a24[0])
			temp += 1000;
		for (let j = 0; j < a24.length; j++) {
			let temp2 = a24[j];
			setTimeout(function () {

				$(huff_tree.children[a13[k]]).fadeIn(1000, "linear", function () {
					$(huff_tree).append(drawLineA($(huff_tree.children[a13[k]]), $(huff_tree.children[temp2])));
				});
			}, temp);
			temp += 1000;
		}
		a24 = [];
	}
	temp += 1000;
	for (let k = 0; k < a2.length; k++) {
		for (let j = 0; j < a3.length; j++) {
			if (a2[k] === a3[j].slice(0, a2[k].length)) {

				setTimeout(function () {
					$(huff_tree.children[a13[j]]).fadeIn(1000, "linear");
				}, temp);
				temp += 1000;
				a23.push(a13[j]);
			}
		}
		if (a23[0])
			temp += 1000;
		for (let j = 0; j < a23.length; j++) {
			let temp2 = a23[j];
			setTimeout(function () {

				$(huff_tree.children[a12[k]]).fadeIn(1000, "linear", function () {
					$(huff_tree).append(drawLineA($(huff_tree.children[a12[k]]), $(huff_tree.children[temp2])));
				});
			}, temp);
			temp += 1000;
		}
		a23 = [];
	}
	temp += 1000;
	for (let k = 0; k < a1.length; k++) {
		for (let j = 0; j < a2.length; j++) {
			if (a1[k] === a2[j].slice(0, a1[k].length)) {

				setTimeout(function () {
					$(huff_tree.children[a12[j]]).fadeIn(1000, "linear");
				}, temp);
				temp += 1000;
				a22.push(a12[j]);
			}
		}
		if (a22[0])
			temp += 1000;
		for (let j = 0; j < a22.length; j++) {
			let temp2 = a22[j];
			setTimeout(function () {

				$(huff_tree.children[a11[k]]).fadeIn(1000, "linear", function () {
					$(huff_tree).append(drawLineA($(huff_tree.children[a11[k]]), $(huff_tree.children[temp2])));
				});
			}, temp);
			temp += 1000;
		}
		a22 = [];
	}
	temp += 1000;
	for (let j = 0; j < a1.length; j++) {
		setTimeout(function () {
			$(huff_tree.children[last - 1]).fadeIn(1000, "linear", function () {
				$(huff_tree.children[a11[j]]).fadeIn(1000, "linear", function () {
					$(huff_tree).append(drawLineA($(huff_tree.children[last - 1]), $(huff_tree.children[a11[j]])));

				});
			});
		}, temp);

	}
}
function drawLineA(a, b) {
	//起点元素中心坐标
	var y_start = Number(a.css("top").replace("px", "")) + a.height() / 2;
	var x_start = Number(a.css("left").replace("px", "")) + a.width() / 2;

	//终点元素中心坐标
	var y_end = Number(b.css("top").replace("px", "")) + b.height() / 2;
	var x_end = Number(b.css("left").replace("px", "")) + b.width() / 2;;

	//用勾股定律计算出斜边长度及其夹角（即连线的旋转角度）
	var lx = x_end - x_start;
	var ly = y_end - y_start;
	//计算连线长度
	var length = Math.sqrt(lx * lx + ly * ly);
	//弧度值转换为角度值
	var c = 360 * Math.atan2(ly, lx) / (2 * Math.PI);

	//连线中心坐标
	var midX = (x_end + x_start) / 2;
	var midY = (y_end + y_start) / 2
	var deg = c <= -90 ? (360 + c) : c;  //负角转换为正角

	if (length > 215 && length < 217) {
		length = 0;
	}
	if (length > 249 && length < 251) {
		length = 0;
	}
	return `<div class='line anim-fadein' 
	                    style='top:${midY}px;left:${midX - length / 2 + 35}px;width:${length}px;transform:rotate(${deg}deg);'>
	                </div>`
}

class Node {
	constructor(value, char, left, right) {
		this.val = value; // 字符出现次数  
		this.char = char; // 待编码字符  
		this.left = left;
		this.right = right;
	}
}

class huffmanTree {
	constructor(str) {
		let hash = {};
		for (let i = 0; i < str.length; i++) {
			hash[i] = str[i];
		}
		this.hash = hash;
		this.huffmanTree = this.getHuffmanTree();
		let map = this.getHuffmanCode(this.huffmanTree);
		for (let key in map) {
			code[i++] = map[key];
		}

		this.binaryStr = this.getBinaryStr(map, str);

	}
	getHuffmanTree() {
		let forest = []
		for (let char in this.hash) {
			let node = new Node(this.hash[char], char);
			forest.push(node);
		}
		let i = forest.length;
		let allNodes = [];
		while (forest.length !== 1) {
			forest.sort((a, b) => {
				return a.val - b.val;
			});
			let node = new Node(forest[0].val + forest[1].val, i + '');
			i = i + 1;
			strA.push(node.val);
			allNodes.push(forest[0]);
			allNodes.push(forest[1]);
			node.left = allNodes[allNodes.length - 2];
			node.right = allNodes[allNodes.length - 1];
			forest = forest.slice(2);
			forest.push(node);
		}
		strA = getNode.concat(strA);
		return forest[0];
	}
	getHuffmanCode(tree) {
		let hash = {};
		let traversal = (node, curPath) => {
			if (!node.length && !node.right) return;
			if (node.left && !node.left.left && !node.left.right) {
				hash[node.left.char] = curPath + '0';
			}
			if (node.right && !node.right.left && !node.right.right) {
				hash[node.right.char] = curPath + '1';
			}
			if (node.left) {
				hash[node.left.char] = curPath + '0';
				traversal(node.left, curPath + '0');
			}
			if (node.right) {
				hash[node.right.char] = curPath + '1';
				traversal(node.right, curPath + '1');
			}
		};
		traversal(tree, '');
		return hash;
	}
	getBinaryStr(map, originStr) {
		let result = '';
		for (let i = 0; i < originStr.length; i++) {
			result += map[originStr[i]];
		}
		return result;
	}
}

