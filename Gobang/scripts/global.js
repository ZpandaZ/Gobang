var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var lock = false;		//棋盘锁
var step = false;		//使用者	true 2:白棋 ， fasle 1:黑棋
var back = false;		//判断是否悔棋
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

canvas.onclick = function(e){
	var x = e.offsetX;
	var y = e.offsetY;
	var px = Math.floor(x/40);
	var py = Math.floor(y/40);
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
}

//绘制棋盘
function drawChessBoard(){
	context.strokeStyle = "#F5270B";
	for (var i = 0; i < 16; i++) {
		context.beginPath();
		context.lineWidth = 2;
	  	context.moveTo(40 * i + 20,0);
	  	context.lineTo(40 * i + 20,600);
	  	context.stroke();
		context.moveTo(0,40 * i + 20);
		context.lineTo(600,40 * i + 20);
		context.stroke();
	};
}

//绘制棋子
function chess(x,y,color){
	context.fillStyle = color?"#bfbfbf":"black"; 
	context.beginPath();  
	context.arc(x * 40 + 20, y * 40 + 20,15, 0, Math.PI * 2);  
	context.closePath();  
	context.fill();  
	chessData[x][y] = color?2:1;
	undoChess = [x,y,color];
	judge(x,y,chessData[x][y]);
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

function undo(){
	context.clearRect(40 * undoChess[0] + 5, 40 * undoChess[1] + 5,30,30);

	context.strokeStyle = "#F5270B";
	context.beginPath();
	context.lineWidth = 2;
	context.moveTo(40 * undoChess[0] + 5, 40 * undoChess[1] + 20);
	context.lineTo(40 * undoChess[0] + 35, 40 * undoChess[1] + 20);
	context.moveTo(40 * undoChess[0] + 20, 40 * undoChess[1] + 5);
	context.lineTo(40 * undoChess[0] + 20, 40 * undoChess[1] + 35);
	context.stroke();

	var x = undoChess[0];
	var y = undoChess[1];
	var color = undoChess[2];
	chessData[x][y] = 0;
	step = !color;
}

function notUndo(){
	context.fillStyle = undoChess[2]?"#bfbfbf":"black"; 
	context.beginPath();  
	context.arc(undoChess[0] * 40 + 20, undoChess[1] * 40 + 20,15, 0, Math.PI * 2);  
	context.closePath();  
	context.fill();  

	var x = undoChess[0];
	var y = undoChess[1];
	var color = undoChess[2];
	chessData[x][y] = color?2:1;
	step = color;
}

