 window.i = 0;
        var arr = new Array();
        var btn = document.querySelector('.btn_f');
        var btn_mid = document.querySelector('.btn_mid');
        var btn_last = document.querySelector('.btn_last');
        var text = document.querySelector('input');
        var ul = document.querySelector('.node');
        var ul_node = document.querySelector('.tree_node');
        var line = document.querySelector('.line');

        var ul_pre = document.querySelector('.pre');
        var ul_mid = document.querySelector('.mid');
        var ul_last = document.querySelector('.last');
		
		document.getElementById("reset").onclick = function () {
			window.location.reload();
		}
        // 节点输入
        document.addEventListener('keydown', function (e) {
            if (e.keyCode == 13) {
                if (text.value == '') {
                    return false;
                } else {
                    var li = document.createElement('li');
                    li.innerHTML = text.value;
                    ul_node.children[i].innerHTML = text.value;
                    ul_node.children[i].style.display = 'block';
                    arr[i] = text.value;
                    i = i + 1;
                    ul.appendChild(li);
                    text.value = '';
                    if (ul_node.children[0].innerHTML !== '' && ul_node.children[1].innerHTML !== '') {
                        $(".tree_node").append(drawLine($(".one"), $(".two")));
                    }
                    if (ul_node.children[0].innerHTML !== '' && ul_node.children[2].innerHTML !== '') {
                        $(".tree_node").append(drawLine($(".one"), $(".three")))
                    }
                    if (ul_node.children[1].innerHTML !== '' && ul_node.children[3].innerHTML !== '') {
                        $(".tree_node").append(drawLine($(".two"), $(".four")))
                    }
                    if (ul_node.children[1].innerHTML !== '' && ul_node.children[4].innerHTML !== '') {
                        $(".tree_node").append(drawLine($(".two"), $(".five")))
                    }
                    if (ul_node.children[2].innerHTML !== '' && ul_node.children[5].innerHTML !== '') {
                        $(".tree_node").append(drawLine($(".three"), $(".six")))
                    }
                    if (ul_node.children[2].innerHTML !== '' && ul_node.children[6].innerHTML !== '') {
                        $(".tree_node").append(drawLine($(".three"), $(".seven")))
                    }
                    if (ul_node.children[3].innerHTML !== '' && ul_node.children[7].innerHTML !== '') {
                        $(".tree_node").append(drawLine($(".four"), $(".eight")))
                    }
                    if (ul_node.children[3].innerHTML !== '' && ul_node.children[8].innerHTML !== '') {
                        $(".tree_node").append(drawLine($(".four"), $(".nine")))
                    }
                    if (ul_node.children[4].innerHTML !== '' && ul_node.children[9].innerHTML !== '') {
                        $(".tree_node").append(drawLine($(".five"), $(".ten")))
                    }
                    if (ul_node.children[4].innerHTML !== '' && ul_node.children[10].innerHTML !== '') {
                        $(".tree_node").append(drawLine($(".five"), $(".eleven")))
                    }
                    if (ul_node.children[5].innerHTML !== '' && ul_node.children[11].innerHTML !== '') {
                        $(".tree_node").append(drawLine($(".six"), $(".twelve")))
                    }
                    if (ul_node.children[5].innerHTML !== '' && ul_node.children[12].innerHTML !== '') {
                        $(".tree_node").append(drawLine($(".six"), $(".thirteen")))
                    }
                    if (ul_node.children[6].innerHTML !== '' && ul_node.children[13].innerHTML !== '') {
                        $(".tree_node").append(drawLine($(".seven"), $(".fourteen")))
                    }
                    if (ul_node.children[6].innerHTML !== '' && ul_node.children[14].innerHTML !== '') {
                        $(".tree_node").append(drawLine($(".seven"), $(".fifteen")))
                    }
                    if (i == 15) {
                        alert('不能超过15个节点');
                    }
                }
            }
        })
        // 节点输入

        // 连线函数
        function drawLine(startObj, endObj) {
            //起点元素中心坐标
            var y_start = Number(startObj.css("top").replace("px", "")) + startObj.height() / 2;
            var x_start = Number(startObj.css("left").replace("px", "")) + startObj.width() / 2;

            //终点元素中心坐标
            var y_end = Number(endObj.css("top").replace("px", "")) + endObj.height() / 2;
            var x_end = Number(endObj.css("left").replace("px", "")) + endObj.width() / 2;;

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

            return `<div class='line' 
                    style='top:${midY}px;left:${midX - length / 2}px;width:${length}px;transform:rotate(${deg}deg);'>
                </div>`
        }
        // 连线函数

        // 前序遍历
        let arr_preA = [1, 2, 3];
        let arr_preB = [1, 2, 4, 5, 3, 6, 7];
        let arr_preC = [1, 2, 4, 8, 9, 5, 10, 11, 3, 6, 12, 13, 7, 14, 15];
        btn.addEventListener("click", function () {
            if (ul.children.length > 0 && ul.children.length < 4) {
                for (var i = 0; i < 3; i++) {
                    if (ul_node.children[arr_preA[i] - 1].innerHTML != '') {
                        var li = document.createElement('li');
                        li.innerHTML = ul_node.children[arr_preA[i] - 1].innerHTML;
                        ul_pre.appendChild(li);
                    }
                }
                var j = 0;
                a = setInterval(function () {
                    far(j);
                    ul_node.children[arr_preA[j] - 1].style.backgroundColor = "red";
                    ul_pre.children[j].style.display = 'block';
                    j = j + 1;
                }, 1500);
                function far(e) {
                    for (var q = 0; q < ul.children.length; q++) {
                        ul_node.children[q].style.backgroundColor = "white";
                    }
                }
            }
            if (ul.children.length > 3 && ul.children.length < 8) {
                for (var i = 0; i < 7; i++) {
                    if (ul_node.children[arr_preB[i] - 1].innerHTML != '') {
                        var li = document.createElement('li');
                        li.innerHTML = ul_node.children[arr_preB[i] - 1].innerHTML;
                        ul_pre.appendChild(li);
                    }
                }
                var j = 0;
                a = setInterval(function () {
                    far(j);
                    ul_node.children[arr_preB[j] - 1].style.backgroundColor = "red";
                    ul_pre.children[j].style.display = 'block';
                    j = j + 1;
                }, 1500);
                function far(e) {
                    for (var q = 0; q < ul.children.length; q++) {
                        ul_node.children[q].style.backgroundColor = "white";
                    }
                }
            }
            if (ul.children.length > 7 && ul.children.length < 16) {

                for (var i = 0; i < 15; i++) {
                    if (ul_node.children[arr_preC[i] - 1].innerHTML != '') {
                        var li = document.createElement('li');
                        li.innerHTML = ul_node.children[arr_preC[i] - 1].innerHTML;
                        ul_pre.appendChild(li);
                    }
                }
                var j = 0;
                a = setInterval(function () {
                    far(j);
                    ul_node.children[arr_preC[j] - 1].style.backgroundColor = "red";
                    ul_pre.children[j].style.display = 'block';
                    j = j + 1;
                }, 1500);
                function far(e) {
                    for (var q = 0; q < ul.children.length; q++) {
                        ul_node.children[q].style.backgroundColor = "white";
                    }
                }
            }
        });
        // 前序遍历

        // 中序遍历
        let arr_midA = [2, 1, 3];
        let arr_midB = [4, 2, 5, 1, 6, 3, 7];
        let arr_midC = [8, 4, 9, 2, 10, 5, 11, 1, 12, 6, 13, 3, 14, 7, 15]
        btn_mid.addEventListener("click", function () {
            if (ul.children.length > 0 && ul.children.length < 4) {
                for (var i = 0; i < 3; i++) {
                    if (ul_node.children[arr_midA[i] - 1].innerHTML != '') {
                        var li = document.createElement('li');
                        li.innerHTML = ul_node.children[arr_midA[i] - 1].innerHTML;
                        ul_mid.appendChild(li);
                    }
                }
                var j = 0;
                a = setInterval(function () {
                    far(j);
                    ul_node.children[arr_midA[j] - 1].style.backgroundColor = "red";
                    ul_mid.children[j].style.display = 'block';
                    j = j + 1;
                }, 1500);
                function far(e) {
                    for (var q = 0; q < ul.children.length; q++) {
                        ul_node.children[q].style.backgroundColor = "white";
                    }
                }
            }
            if (ul.children.length > 3 && ul.children.length < 8) {
                for (var i = 0; i < 7; i++) {
                    if (ul_node.children[arr_midB[i] - 1].innerHTML != '') {
                        var li = document.createElement('li');
                        li.innerHTML = ul_node.children[arr_midB[i] - 1].innerHTML;
                        ul_mid.appendChild(li);
                    }
                }
                var j = 0;
                a = setInterval(function () {
                    far(j);
                    ul_node.children[arr_midB[j] - 1].style.backgroundColor = "red";
                    ul_mid.children[j].style.display = 'block';
                    j = j + 1;
                }, 1500);
                function far(e) {
                    for (var q = 0; q < ul.children.length; q++) {
                        ul_node.children[q].style.backgroundColor = "white";
                    }
                }
            }
            if (ul.children.length > 7 && ul.children.length < 16) {
                for (var i = 0; i < 15; i++) {
                    if (ul_node.children[arr_midC[i] - 1].innerHTML != '') {
                        var li = document.createElement('li');
                        li.innerHTML = ul_node.children[arr_midC[i] - 1].innerHTML;
                        ul_mid.appendChild(li);
                    }
                }
                var j = 0;
                a = setInterval(function () {
                    far(j);
                    ul_node.children[arr_midC[j] - 1].style.backgroundColor = "red";
                    ul_mid.children[j].style.display = 'block';
                    j = j + 1;
                }, 1500);
                function far(e) {
                    for (var q = 0; q < ul.children.length; q++) {
                        ul_node.children[q].style.backgroundColor = "white";
                    }
                }
            }
         
        });
        // 中序遍历

        // 后序遍历
        let arr_lastA = [2, 3, 1];
        let arr_lastB = [4, 5, 2, 6, 7, 3, 1];
        let arr_lastC = [8, 9, 4, 10, 11, 5, 2, 12, 13, 6, 14, 15, 7, 3, 1];
        btn_last.addEventListener("click", function () {
            if (ul.children.length > 0 && ul.children.length < 4) {
                for (var i = 0; i < 3; i++) {
                    if (ul_node.children[arr_lastA[i] - 1].innerHTML != '') {
                        var li = document.createElement('li');
                        li.innerHTML = ul_node.children[arr_lastA[i] - 1].innerHTML;
                        ul_last.appendChild(li);
                    }
                }
                var j = 0;
                a = setInterval(function () {
                    far(j);
                    ul_node.children[arr_lastA[j] - 1].style.backgroundColor = "red";
                    ul_last.children[j].style.display = 'block';
                    j = j + 1;
                }, 1500);
                function far(e) {
                    for (var q = 0; q < ul.children.length; q++) {
                        ul_node.children[q].style.backgroundColor = "white";
                    }
                }
            }
            if (ul.children.length > 3 && ul.children.length < 8) {
                for (var i = 0; i < 7; i++) {
                    if (ul_node.children[arr_lastB[i] - 1].innerHTML != '') {
                        var li = document.createElement('li');
                        li.innerHTML = ul_node.children[arr_lastB[i] - 1].innerHTML;
                        ul_last.appendChild(li);
                    }
                }
                var j = 0;
                a = setInterval(function () {
                    far(j);
                    ul_node.children[arr_lastB[j] - 1].style.backgroundColor = "red";
                    ul_last.children[j].style.display = 'block';
                    j = j + 1;
                }, 1500);
                function far(e) {
                    for (var q = 0; q < ul.children.length; q++) {
                        ul_node.children[q].style.backgroundColor = "white";
                    }
                }
            }
            if (ul.children.length > 7 && ul.children.length < 16) {
                for (var i = 0; i < 15; i++) {
                    if (ul_node.children[arr_lastC[i] - 1].innerHTML != '') {
                        var li = document.createElement('li');
                        li.innerHTML = ul_node.children[arr_lastC[i] - 1].innerHTML;
                        ul_last.appendChild(li);
                    }
                }
                var j = 0;
                a = setInterval(function () {
                    far(j);
                    ul_node.children[arr_lastC[j] - 1].style.backgroundColor = "red";
                    ul_last.children[j].style.display = 'block';
                    j = j + 1;
                }, 1500);
                function far(e) {
                    for (var q = 0; q < ul.children.length; q++) {
                        ul_node.children[q].style.backgroundColor = "white";
                    }
                }
            }
        });
        // 后序遍历