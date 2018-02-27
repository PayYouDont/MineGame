$(function(){
	diff = "easy"
	initCell(diff);
});
var diff;
var createCell = function(){
	var Cell = {
			id:0,
			number:0,//-1(雷),0(空白格),1-8周围雷数字
			image:function(div){
				var img = "<img src='/img/pwd_20.png'/>";
				if(this.isMine()){
					$(div).html(img)
				}else{
					$(div).html(this.number);
				}
			},
			isMine:function(){
				return this.number==-1;
			},//是否是雷	
			clicked:function(div){
				if(this.isMine()){
					alert("game over");
				}else{
					if(this.number==0){
						nearCellBreak(this.id);
					}else{
						$(div).html(this.number);
					}
				}
			},
			contextmenu:function(div){//鼠标右键
				if(this.isMine()){
					var img = "<img src='/img/pwd_20.png'/>";
					$(div).html(img)
				}else{
					
				}
			}
		};
	return Cell;
}
//难度
var difficulty = {
	easy:{
		mineCount:10,//雷总数	
		cell_CountX:9,//格子横向数量
		cell_CountY:9//格子纵向数量
	},
	normal:{
		mineCount:40,
		cell_CountX:16,
		cell_CountY:16
	},
	hard:{
		mineCount:99,
		cell_CountX:30,
		cell_CountY:16
	},
	custom:{
		/*mineCount_MAX:668,
		cell_CountX_MAX:30,
		cell_CountY_MAX:24*/
	}
}
function initCell(diff){
	var mineCount = difficulty[diff].mineCount;
	var countX = difficulty[diff].cell_CountX;
	var countY = difficulty[diff].cell_CountY;
	var width = countX*22;
	var height = countY*22;
	var maxWidth = $(".main").width();
	var maxHeight = $(".main").height();
	
	$(".cells").css({
		"width":width+"px",
		"margin-left":(maxWidth-width)/2,
		"margin-top":(maxHeight-height)/2,
	});
	var left = $(".main").css("marginLeft")
	left = parseFloat(left);
	var startX = 59 + left +(maxWidth-width)/2;
	var startY = 59 + (maxHeight-height)/2;
	var endX = startX + width;
	var endY = startY + height;
	var mines = getMine(mineCount,countX*countY);
	var cells = getCell(startX, startY, countX, countY, mines);
	var html = "";
	for(i=0;i<cells.length;i++){
		var cell = cells[i];
		var number = cell.number;
		html += "<div class='cell' data-index='"+cell.id+"' " +
				"style='width:20px;height:20px;" +
				"border:1px solid #c1c1c1c1'></div>"
	}
	$(".cells").html(html);
	//鼠标左键点击事件
	$(".cell").on("click",function(e){
		var id = $(this).data("index");
		var cell = cells[id];
		cell.image(this);
		cell.clicked(this);
	});
	//鼠标右键点击事件
	$(".cell").on("contextmenu",function(e){
		var id = $(this).data("index");
		var cell = cells[id];
		cell.contextmenu(this);
		return false;
	});
}
//生成雷
function getMine(sum,count){
	var flags = [];
	for(i in count){
		flags.push(false);
	}
	var mines = {};
	for(var i=0;i<sum;i++){
		var number = Math.random()*count;
		number = parseInt(number);
		while(flags[number]){
			number = Math.random()*count;
			number = parseInt(number)
		}
		mines[number]=number;
		flags[number] = true;
	}
	return mines;
}
//生成数字格
function getCell(startX,startY,countX,countY,mines){
	var cellArr = [];
	for(var i=0;i<countX*countY;i++){
		var cell = new createCell();
		cell.id = i;
		cellArr.push(cell);
	}
	for(i in mines){
		var mine = mines[i];
		var minX,maxX,minY,maxY;
		if(mine%countX!=0){
			minX = startX + (mine-1)%countX*22
		}else{
			minX = startX;
		}
		if((mine+1)%countX!=0){
			maxX = startX + (mine+1)%countX*22;
		}else{
			maxX = startX + countX*22;
		}
		if(parseInt(mine/countX)!=0){
			minY = startY + (parseInt(mine/countX)-1)*22
		}else{
			minY = startY;
		}
		if(parseInt(mine/countX)+1!=countY){
			maxY = startY + (parseInt(mine/countX)+1)*22;
		}else{
			maxY = startY + countY*22;
		}
		for(var j=0;j<cellArr.length;j++){
			var cell = cellArr[j];
			if(j==mine){
				cell.number = -1;
			}else{
				var x = startX + j%countX*22;
				var y = startY + parseInt(j/countX)*22;
				//console.log("x="+x,"y="+y)
				if(minX<=x&&x<=maxX&&minY<=y&&y<=maxY){
					if(cell.number!=-1){
						cell.number++;
					}
				}
			}
		}
	}
	return cellArr;
}
var nearCell;
function nearCellBreak(id){
	nearCell = [];
	var mineCount = difficulty[diff].mineCount;
	var countX = difficulty[diff].cell_CountX;
	var countY = difficulty[diff].cell_CountY;
	recursionCell(id,countX,countY);
}
function recursionCell(id,countX,countY){//递归
	var id1,id2,id3,id4;
	id1 = (id-countX)>=0?id-countX:id;//纵向-1
	id2 = (id+countX)<countX*countY?id+countX:id;//纵向+1
	id3 = id%countX!=0?id%countX-1:id;//横向-1
	id4 = (id+1)%countX!=0?id%countX+1:id;//横向+1
	
}