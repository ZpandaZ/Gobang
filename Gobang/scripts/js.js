var content = document.getElementById("content");

var lock = false;		//棋盘锁
var step = false;		//使用者	true 2:白棋 ， fasle 1:黑棋
var lockWarming = "该局已结束，请重新开始";
var chessWarming = "该处已有棋子";
var winB = "黑棋赢了";
var winW = "白棋赢了";
var undoChess = [];		//存储悔棋步骤
var chessData = [];		//存储棋盘信息
for (var i = 0; i < 15; i++) {
	chessData[i] = [];
	for (var j = 0; j < 15; j++) {
		chessData[i][j] = 0;
	}
};

drawChessBoard();


content.onclick=function(event){   
    var px = Math.floor((event.clientX-20)/40);
	var py = Math.floor((event.clientY-20)/40);
	if (lock) {
		alert(lockWarming);
	}
	else if (chessData[px][py]) {
		alert(chessWarming);
	}
	else{
		step = !step;
		chess(px,py,step);
	}
};  
/*imitateClick(body);  

//获取鼠标位置
function imitateClick(oElement,iClientX,iClientY){  
    var oEvent;  
    if (document.createEventObject) {  
        oEvent=document.createEventObject();  
        oEvent.clientX=iClientX;  
        oEvent.clientY=iClientY;  
        oElement.fireEvent("onclick",oEvent);  
    }else{  
        oEvent=document.createEvent("MouseEvents");  
        oEvent.initMouseEvent("click",true,true,document.defaultView,0,0,0,iClientX,iClientY);  
        oElement.dispatchEvent(oEvent);  
    }  
}  */

//绘制棋盘
function drawChessBoard(){
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			var div = document.createElement("div");
			div.className = i + "," + j;
			div.style.position = "absolute";
			div.style.left = i * 40 + 20 + "px";
			div.style.top = j * 40 + 20 + "px";
			div.style.width = 40 + "px";
			div.style.height = 40 + "px";
			div.style.display = "inline-block";
			div.style.backgroundImage = "url(images/grid.png)";
			content.appendChild(div);
		}
	}
}

//绘制棋子
function chess(px,py,step){
	var div = document.getElementsByClassName(px + "," + py);
	if (step) {
		div[0].style.backgroundImage = "url(images/whiteChess.png)";
	}else{
		div[0].style.backgroundImage = "url(images/blackChess.png)";
	}
	chessData[px][py] = step ? 2 : 1;
	undoChess = [px,py,step];
	judge(px,py,chessData[px][py]);
}

function undo(){
	var div = document.getElementsByClassName(undoChess[0] + "," + undoChess[1]);
	div[0].style.backgroundImage = "url(images/grid.png)";

	var x = undoChess[0];
	var y = undoChess[1];
	var color = undoChess[2];
	chessData[x][y] = 0;
	step = !color;
}

function notUndo(){
	var div = document.getElementsByClassName(undoChess[0] + "," + undoChess[1]);
	if (undoChess[2]) {
		div[0].style.backgroundImage = "url(images/whiteChess.png)";
	}else{
		div[0].style.backgroundImage = "url(images/blackChess.png)";
	}

	var x = undoChess[0];
	var y = undoChess[1];
	var color = undoChess[2];
	chessData[x][y] = color?2:1;
	step = color;
}

//判断胜负
function judge(x,y,color){
	var count1 = 0; 
	var count2 = 0; 
	var count3 = 0; 
	var count4 = 0; 
	//左右判断 
	for (var i = x; i >= 0; i--) { 
		if (chessData[i][y] != color) { 
			break; 
		} 
		count1++; 
	} 
	for (var i = x + 1; i < 15; i++) { 
		if (chessData[i][y] != color) { 
			break; 
		} 
		count1++; 
	} 

	//上下判断 
	for (var i = y; i >= 0; i--) { 
		if (chessData[x][i]!= color) { 
			break; 
		} 
		count2++; 
	} 
	for (var i = y + 1; i < 15; i++) { 
		if (chessData[x][i]!= color) { 
			break; 
		} 
		count2++; 
	} 

	//左上右下判断 
	for (var i = x, j = y; i >= 0 && j >= 0; i--, j--) { 
		if (chessData[i][j] != color) { 
			break; 
		} 
		count3++; 
	} 
	for (var i = x + 1, j = y + 1; i < 15 && j < 15; i++, j++) { 
		if (chessData[i][j] != color) { 
			break; 
		} 
		count3++; 
	} 

	//右上左下判断 
	for (var i = x, j = y; i >= 0 && j < 15; i--, j++) { 
		if (chessData[i][j] != color) { 
			break; 
		} 
		count4++; 
	} 
	for (var i = x + 1, j = y - 1; i < 15 && j >= 0; i++, j--) { 
		if (chessData[i][j] != color) { 
			break; 
		} 
		count4++; 
	} 

	if (count1 >= 5 || count2 >= 5 || count3 >= 5 || count4 >= 5) { 
		if (color == 1) { 
			alert(winB); 
			lock = true;
		} 
		else { 
			alert(winW); 
			lock = true;
		} 
	}
}