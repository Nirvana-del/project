(function() {
	//存放图结点的数组
	
	var graphVertex = ["v0", "v1", "v2", "v3", "v4", "v5", "v6"];
	var ul = document.querySelector('.node');
	var ul_node = document.querySelector('.graph_node');//ul
	//存放图边的数组
	var graphAdge = [{
			start: "v0",
			end: "v2",
			weight: 1
		},
		{
			start: "v0",
			end: "v5",
			weight: 8
		},
		{
			start: "v3",
			end: "v2",
			weight: 1
		},
		{
			start: "v3",
			end: "v5",
			weight: 3
		},
		{
			start: "v4",
			end: "v1",
			weight: 6
		},
		{
			start: "v5",
			end: "v4",
			weight: 6
		},
		{
			start: "v1",
			end: "v2",
			weight: 8
		},
		{
			start: "v1",
			end: "v6",
			weight: 8
		}
	];
	//图的构造函数,n:结点数量 ， e: 边的数量
	var GraphList = function(graphVertex, graphAdge) {
		var vertex = []; //存放图中顶点的数组
		var adjList = []; //存放图中边的邻接矩阵
		var n = graphVertex.length,
			e = graphAdge.length;
		//初始化邻接表
		var initArr = function() {
			//深拷贝，不改变输入数组
			vertex = JSON.parse(JSON.stringify(graphVertex));
			//顶点和边的数量
			var n = graphVertex.length,
				e = graphAdge.length;
			//初始化arc数组
			for (let i = 0; i < n; i++) {
				adjList[i] = {
					"vertex": vertex[i],
					"firstEdge": null
				};
			}
			//console.log(adjList);
			//给arc邻接矩阵填充边的权值
			for (let i = 0; i < e; i++) {
				var start = graphVertex.indexOf(graphAdge[i].start);
				var end = graphVertex.indexOf(graphAdge[i].end);
				if (start === -1 || end === -1) {
					throw Error("边数组中有结点不在结点数组中");
					return;
				}
				var s = {
					"node": end,
					"weight": graphAdge[i].weight,
					"next": adjList[start].firstEdge
				}
				adjList[start].firstEdge = s;

				//无向图需要下面这两个，有向图不需要
				var t = {
					"node": start,
					"weight": graphAdge[i].weight,
					"next": adjList[end].firstEdge
				}
				adjList[end].firstEdge = t;
			}
			//console.log(adjList);
		};
		//立即执行函数，初始化
		(function() {
			initArr();
		})();

		//图的深度优先遍历
		var dfsTraverse = function(v) {
			//输入检测
			if (vertex.indexOf(v) === -1) {
				throw Error("广度优先遍历输入结点不在结点数组中");
				return;
			}

			var result = [],
				visited = [];
			var stack = [];
			stack.push(v);
			result.push(v);
			visited[vertex.indexOf(v)] = true;
			while (stack.length !== 0) {
				let top = stack.pop();
				if (visited[vertex.indexOf(top)] !== true) {
					result.push(top);
					visited[vertex.indexOf(top)] = true;
				}
				let row = vertex.indexOf(top);

				var p = adjList[row].firstEdge;
				while (p !== null) {
					let j = p.node;
					if (visited[j] !== true) {
						stack.push(vertex[j]);
						//visited[j] = true;
					}
					p = p.next;
				}
				if (result.length > 100) {
					alert("死循环");
				}
			}
			//console.log(result);
			return result;
		}
		//图的广度优先遍历
		var bfsTraverse = function(v) {
			//输入检测
			if (vertex.indexOf(v) === -1) {
				throw Error("广度优先遍历输入结点不在结点数组中");
				return;
			}
			//广度优先遍历
			var queue = [],
				result = [],
				visited = [];
			var pre = 0,
				tail = 1;
			queue.push(v);
			visited[vertex.indexOf(v)] = 1;
			while (pre !== tail) {
				let v = queue[pre++];
				let row = vertex.indexOf(v);
				//console.log(row,"----");
				if (row === -1) {
					throw Error("广度优先遍历结点不在结点数组中");
				}
				var p = adjList[row].firstEdge;
				while (p !== null) {
					let j = p.node;
					if (visited[j] === undefined) {
						queue.push(vertex[p.node]);
						visited[j] = 1;
					}
					p = p.next;
				}
				tail = queue.length;
				if (pre > 100) {
					alert("死循环");
				}
			}
			//console.log(queue);
			return queue;
		}
		//Floyd最短路径
		var floyd = function() {
			var dist = [],
				path = [];
			//初始化
			for (let i = 0; i < n; i++) {
				dist[i] = new Array(n);
				path[i] = new Array(n);
				for (let j = 0; j < n; j++) {
					dist[i][j] = Infinity;
					path[i][j] = [];
				}
				let p = adjList[i].firstEdge;
				let count = 0;
				while (p != null) {
					dist[i][p.node] = p.weight;
					path[i][p.node] = [vertex[i]];

					p = p.next;
					if (count++ > 100) {
						alert("死循环");
					}
				}

			}
			//console.log(dist,path);
			//核心代码
			for (let k = 0; k < n; k++) {
				for (let i = 0; i < n; i++) {
					for (let j = 0; j < n; j++) {
						if (dist[i][k] + dist[k][j] < dist[i][j]) {
							dist[i][j] = dist[i][k] + dist[k][j];
							path[i][j] = path[i][k].concat(path[k][j]);
						}
						if (i === j) {
							dist[i][j] = 0;
						}
					}
				}
			}
			//加上终点结点名
			for (let i = 0; i < n; i++) {
				for (let j = 0; j < n; j++) {
					if (dist[i][j] !== Infinity && dist[i][j] != 0) {
						path[i][j].push(vertex[j]);
					}
				}
			}
			//console.log(dist,path);
			var out = {
				"dist": dist,
				"path": path
			}
			return out;
		}
		//Dijkstra
		var dijkstra = function(v) {
			var getDist = function(k, i) {
				var dist = Infinity;
				var p = adjList[k].firstEdge;
				let count = 0;
				while (p != null) {
					if (i === p.node) {
						dist = p.weight;
					}
					p = p.next;
					if (count++ > 100) {
						alert("死循环");
					}
				}
				return dist;
			}
			var index = vertex.indexOf(v);
			var dist = [],
				path = [];
			for (let i = 0; i < n; i++) {
				dist[i] = Infinity;
				path[i] = [];
			}
			let p = adjList[index].firstEdge;
			let count = 0;
			while (p != null) {
				dist[p.node] = p.weight;
				path[p.node] = [v, vertex[p.node]];
				p = p.next;
				if (count++ > 100) {
					alert("死循环");
				}
			}
			//console.log("dist",dist,path);
			var vis = [];
			vis[vertex.indexOf(v)] = true;
			dist[vertex.indexOf(v)] = 0;
			var num = 1;
			while (num < n) {
				let k = 1;
				for (let i = 0; i < n; i++) {
					if (vis[i] !== true && dist[k] > dist[i]) {
						k = i;
					}
				}
				vis[k] = true;
				for (let i = 0; i < n; i++) {
					if (dist[i] > dist[k] + getDist(k, i)) {
						dist[i] = dist[k] + getDist(k, i);
						path[i] = path[k].concat([vertex[i]]);
					}
				}
				num++;
			}
			//console.log(dist,path);
			var out = {
				"dist": dist,
				"path": path
			}
			return out;
		}
		return {
			dfsTraverse: dfsTraverse,
			bfsTraverse: bfsTraverse,
			floyd: floyd,
			dijkstra: dijkstra
		}
	}
	//显示图
	var showGraph = function() {
		var svg = document.getElementById("svg");
		var circleStr = "",
			lineStr = "",
			textStr = "",
			arrowStr = ""; //圆、线和文本的HTML字符串
		var adge = JSON.parse(JSON.stringify(graphAdge)); //层序遍历生成数组
		var vertex = JSON.parse(JSON.stringify(graphVertex)); //层序遍历生成数组
		var vertexObj = {}; //存放所有顶点的对象，键为顶点名，值为含有属性的对象
		var width = Number(svg.getAttribute("width")) - 50; //画布宽度
		var r = width / 2; //半径
		//画圆和顶点名
		for (let i = 0; i < vertex.length; i++) {
			let vertexName = vertex[i],
				len = vertexName.length;
			let angle = (i * 2 * Math.PI / vertex.length);
			let cx = 0,
				cy = 0; //当前结点的定位像素坐标
			cx = r * (1 + Math.sin(angle)) + 25;
			cy = r * (1 - Math.cos(angle)) + 25;
			let obj = {
				"cx": cx,
				"cy": cy
			};
			vertexObj[vertexName] = obj;
			circleStr += '<circle cx="' + cx + '" cy="' + cy + '" r="20" fill="#9F79EE"/></circle>';//连线
			//调整文本缩进
			let textcx = len > 1 ? (cx - 10) : (cx - 5);
			let textcy = cy + 6;
			textStr += '<text x="' + textcx + '" y="' + textcy + '" fill="black">' + vertexName + '</text>';//圆中的结点
		}
		//画线和数字
		for (let i = 0; i < adge.length; i++) {
			//如果依然处于当前层，则累加占用宽度，否则将占用宽度置零，更新层数

			let startcx = 0,
				startcy = 0,
				endcx = 0,
				endcy = 0; //当前结点的定位像素坐标

			if (!vertexObj[adge[i].start] || !vertexObj[adge[i].end]) {
				throw Error("边数组中有结点不在结点数组中");
				return;
			}
			startcx = vertexObj[adge[i].start].cx;
			startcy = vertexObj[adge[i].start].cy;
			endcx = vertexObj[adge[i].end].cx;
			endcy = vertexObj[adge[i].end].cy;
			lineStr += '<line x1="' + startcx + '" y1="' + startcy + '" x2="' + endcx +
				'" y2="' + endcy + '" style="stroke:#96c5b9;stroke-width:2" />';

			//计算三角形箭头的坐标和旋转角
			var getTriangle = function(obj) {
				var x = endcx,
					y = endcy + 20;
				startcx = obj.startcx;
				startcy = obj.startcy;
				endcx = obj.endcx;
				endcy = obj.endcy;
				var x = endcx,
					y = endcy + 20;
				var points = [x - 4, y + 9, x + 4, y + 9, x, y].join(","); //一个三角形三点的坐标
				var angle = 0;
				//注意这里的坐标系和通常情况下的坐标系y轴是相反的，因此 endcy-startcy 要变为startcy-endcy
				angle = 180 * Math.acos((startcy - endcy) / Math.sqrt((endcx - startcx) * (endcx -
					startcx) +
					(startcy - endcy) * (startcy - endcy))) / Math.PI;
				if (endcx - startcx < 0) {
					angle = 360 - angle;
				}
				var out = {
					"points": points,
					"angle": angle
				}
				return out;
			}
			//如果是无向图隐藏下面计算与画三角形箭头的代码即可
			var obj = {
				"startcx": startcx,
				"startcy": startcy,
				"endcx": endcx,
				"endcy": endcy
			}
			var data = getTriangle(obj);
			var angle = [data.angle, endcx, endcy].join(",");
//有向图
			//画三角形箭头
			arrowStr += '<polygon points="' + data.points + '" fill:"#96c5b9" transform="rotate(' + angle +
				')"/>';

			obj = {
				"startcx": endcx,
				"startcy": endcy,
				"endcx": startcx,
				"endcy": startcy
			}
			data = getTriangle(obj);
			angle = [data.angle, endcx, endcy].join(",");
			//画三角形箭头
			arrowStr += '<polygon points="' + data.points + '" fill:"#96c5b9" transform="rotate(' + angle +
				')"/>';


			//调整文本缩进
			var textcx = (startcx + endcx) / 2;
			var textcy = (startcy + endcy) / 2;

			textStr += '<text x="' + textcx + '" y="' + textcy + '" fill="#96c5b9">' + adge[i].weight +
				'</text>';
		}
		svg.innerHTML = lineStr + circleStr + textStr + arrowStr;
	}
	showGraph();

	var graph = new GraphList(graphVertex, graphAdge);
	console.log("基于邻接表实现：");
	console.log("深度优先遍历", graph.dfsTraverse("v0"));
	console.log("广度优先遍历", graph.bfsTraverse("v0"));
	console.log("Floyd算法求最短路径", graph.floyd());
	console.log("Dijkstra算法求最短路径", graph.dijkstra("v0"));

	var showGraphTraverse = function(id) {
		var svg = document.getElementById("svg");
		svg.innerHTML = "";
		var circleStr = "",
			lineStr = "",
			textStr = "",
			arrowStr = ""; //圆、线和文本的HTML字符串
		var adge = JSON.parse(JSON.stringify(graphAdge)); //层序遍历生成数组
		var vertex = JSON.parse(JSON.stringify(graphVertex)); //层序遍历生成数组
		var vertexObj = {}; //存放所有顶点的对象，键为顶点名，值为含有属性的对象
		var width = Number(svg.getAttribute("width")) - 50; //画布宽度
		var r = width / 2; //半径
		//画圆和顶点名
		for (let i = 0; i < vertex.length; i++) {
			let vertexName = vertex[i],
				len = vertexName.length;
			let angle = (i * 2 * Math.PI / vertex.length);
			let cx = 0,
				cy = 0; //当前结点的定位像素坐标
			cx = r * (1 + Math.sin(angle)) + 25;
			cy = r * (1 - Math.cos(angle)) + 25;
			let obj = {
				"cx": cx,
				"cy": cy
			};
			vertexObj[vertexName] = obj;
			var color = "#96c5b9";//圆的颜色
			if (id === vertex[i]) {
				color = "#3888ad";
			}


			circleStr += '<circle cx="' + cx + '" cy="' + cy + '" r="20" fill="' + color + '"/></circle>';
			//调整文本缩进
			let textcx = len > 1 ? (cx - 10) : (cx - 5);
			let textcy = cy + 6;
			textStr += '<text x="' + textcx + '" y="' + textcy + '" fill="white">' + vertexName + '</text>';
		}
		//画线和数字
		for (let i = 0; i < adge.length; i++) {
			//如果依然处于当前层，则累加占用宽度，否则将占用宽度置零，更新层数

			let startcx = 0,
				startcy = 0,
				endcx = 0,
				endcy = 0; //当前结点的定位像素坐标

			if (!vertexObj[adge[i].start] || !vertexObj[adge[i].end]) {
				throw Error("边数组中有结点不在结点数组中");
				return;
			}
			startcx = vertexObj[adge[i].start].cx;
			startcy = vertexObj[adge[i].start].cy;
			endcx = vertexObj[adge[i].end].cx;
			endcy = vertexObj[adge[i].end].cy;
			lineStr += '<line x1="' + startcx + '" y1="' + startcy + '" x2="' + endcx +
				'" y2="' + endcy + '" style="stroke:#999;stroke-width:2" />';

			//计算三角形箭头的坐标和旋转角
			var getTriangle = function(obj) {
				var x = endcx,
					y = endcy + 20;
				startcx = obj.startcx;
				startcy = obj.startcy;
				endcx = obj.endcx;
				endcy = obj.endcy;
				var x = endcx,
					y = endcy + 20;
				var points = [x - 4, y + 9, x + 4, y + 9, x, y].join(","); //一个三角形三点的坐标
				var angle = 0;
				//注意这里的坐标系和通常情况下的坐标系y轴是相反的，因此 endcy-startcy 要变为startcy-endcy
				angle = 180 * Math.acos((startcy - endcy) / Math.sqrt((endcx - startcx) * (endcx -
					startcx) +
					(startcy - endcy) * (startcy - endcy))) / Math.PI;
				if (endcx - startcx < 0) {
					angle = 360 - angle;
				}
				var out = {
					"points": points,
					"angle": angle
				}
				return out;
			}
			//如果是无向图隐藏下面计算与画三角形箭头的代码即可
			var obj = {
				"startcx": startcx,
				"startcy": startcy,
				"endcx": endcx,
				"endcy": endcy
			}
			var data = getTriangle(obj);
			var angle = [data.angle, endcx, endcy].join(",");
			//画三角形箭头
			arrowStr += '<polygon points="' + data.points + '" fill:"#45c5a5" transform="rotate(' + angle +
				')"/>';
			obj = {
				"startcx": endcx,
				"startcy": endcy,
				"endcx": startcx,
				"endcy": startcy
			}
			data = getTriangle(obj);
			angle = [data.angle, endcx, endcy].join(",");
			//画三角形箭头
			arrowStr += '<polygon points="' + data.points + '" fill:"#45c5a5" transform="rotate(' + angle +
				')"/>';
			//调整文本缩进
			var textcx = (startcx + endcx) / 2;
			var textcy = (startcy + endcy) / 2;

			textStr += '<text x="' + textcx + '" y="' + textcy + '" fill="#45c5a5">' + adge[i].weight +
				'</text>';
		}
		svg.innerHTML = lineStr + circleStr + textStr + arrowStr;
	}

	var select = document.getElementById("select");
	var button = document.getElementById("button");
	var node = document.getElementById("node");

	var optionStr = '';
	for (let i = 0; i < graphVertex.length; i++) {
		optionStr += '<option>' + graphVertex[i] + '</option>';
	}
	node.innerHTML = optionStr;
//事件监听
button.addEventListener("click", function() {
	if (button.click === false) {
		return;
	} else {
		button.click = false;
	}
	var nodeIndex = node.selectedIndex;
	var selectValue = node.options[nodeIndex].value;
	console.log(selectValue);
	var index = select.selectedIndex;
	console.log(index);
	switch (index) {
		case 0:
			traversalArr = graph.dfsTraverse(selectValue);
			var str = '<h3 style="text-align: left;">深度优先遍历</h3>';
			$(".mytitle").html(str);
			var dfs = graph.dfsTraverse(selectValue);
			if ($("ul.graph_node").find("li").length > 0) {
				var childs = ul_node.childNodes;
				console.log(childs)
				for (var i = childs.length - 1; i >= 0; i--) {
					ul_node.removeChild(childs[i])
				}
			}
			for (var i = 0; i < dfs.length; i++) {
				var li = document.createElement('li');
				ul_node.appendChild(li)
				li.innerHTML = dfs[i];
				ul_node.children[i].innerHTML = dfs[i];
				ul_node.children[i].style.display = "inline";
			}
			break;
			case 1:
			traversalArr = graph.bfsTraverse(selectValue);
			var str = '<h3 style="text-align: left;">广度优先遍历</h3>';
			$(".mytitle").html(str);
			var bfs = graph.bfsTraverse(selectValue);
			if ($("ul.graph_node").find("li").length > 0) {
				var childs = ul_node.childNodes;
				console.log(childs)
				for (var i = childs.length - 1; i >= 0; i--) {
					ul_node.removeChild(childs[i])
				}
			}
			for (var i = 0; i < bfs.length; i++) {
				var li = document.createElement('li');
				ul_node.appendChild(li)
				li.innerHTML = bfs[i];
				ul_node.children[i].innerHTML = bfs[i];
				ul_node.children[i].style.display = "inline";
			}
			break;
		default:
			alert("选择遍历方式出错");
			break;
	}
	//注意，这里故意
	for (let i = 0; i <= traversalArr.length; i++) {
		setTimeout(function(i) {
			showGraphTraverse(traversalArr[i]);
			if (i >= traversalArr.length) {
				button.click = true;
				console.log("OK");
			}
		}, 1000 * i, i);
	}
});

})();
