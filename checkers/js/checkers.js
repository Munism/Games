var turn = 'redPiece',
currentPiece;

function endTurn() {
	if (turn === 'redPiece') {
		turn = 'blackPiece';
	} else {
		turn = 'redPiece';
	}
}

function drawBoard() {
    'use strict';
    var row,
        column,
        start,
        color,
        size;
    for (row = 0; row < 8; row += 1) {
        if (row % 2 === 0) {
			start = "white"; 
		} else {
			start = "black";
		}
        color = start;
        for (column = 0; column < 8; column+=1) {
            //console.log(color, row, column);
            $('.gameboard').append("<div class = \"cell row"+row+" col"+column+"\"id=\""+color+"Square\"></div>");
            color = function(input) {
                color === "white" ? color = "black" : color = "white";
                return color;
            }(color);
        }
    }
    makeSquare();
}

function makeSquare() {
	 'use strict';
    var width = $('.cell').css('width');
    $('.cell').css('height',width);
}

function movePiece() {
	'use strict';
    
}

function canMoveTo(piece,x,y,color) {
	 'use strict';

//convert x and y to integers
    x = x - 0;
    y = y - 0;
    var possibleMoves = [];
    if(color === "redPiece") {
        (y-1) >= 0 ?  possibleMoves.push([x-1,y-1]) : false;
        (y+1) <= 7 ? possibleMoves.push([x-1,y+1]) : false; 
    } else {
        (y-1) >= 0 ?  possibleMoves.push([x+1,y-1]) : false;
        (y+1) <= 7 ? possibleMoves.push([x+1,y+1]) : false; 
    }
    //need to check if its occupied, and by what color to know wheter to jump or if cant move there
    $('.row'+possibleMoves[0][0]+'.col'+possibleMoves[0][1]).css('background-color','purple');
    possibleMoves[1] != undefined ? $('.row'+possibleMoves[1][0]+'.col'+possibleMoves[1][1]).css('background-color','purple') : false;
    console.log("Can move to : " + (possibleMoves[0])  + " or " + possibleMoves[1] + ".");
}

function highlight(checker) {
	'use strict';
	var x,
    y,
    raw = ($(checker).parent().attr('class')).split(" "),
	color = $(checker).attr('id'),
	possibleMoves=[];
	
    x = ((raw[1].split(""))[3]) - 0;
    y = ((raw[2].split(""))[3]) - 0;
	if(color === "redPiece") {
        (y-1) >= 0 ?  possibleMoves.push([x-1,y-1]) : false;
        (y+1) <= 7 ? possibleMoves.push([x-1,y+1]) : false; 
    } else {
        (y-1) >= 0 ?  possibleMoves.push([x+1,y-1]) : false;
        (y+1) <= 7 ? possibleMoves.push([x+1,y+1]) : false; 
    }
	$('.row'+possibleMoves[0][0]+'.col'+possibleMoves[0][1]).css('background-color','purple');
    if( possibleMoves[1] != undefined) {  
		$('.row'+possibleMoves[1][0]+'.col'+possibleMoves[1][1]).css('background-color','purple') 
	}	
	return possibleMoves;
}

function unhighlight(checker) {
	 'use strict';
    var x,
    y,
    raw = ($(checker).parent().attr('class')).split(" ");
    x = ((raw[1].split(""))[3]) - 0;
    y = ((raw[2].split(""))[3]) - 0;
    $('.row'+(x+1)+'.col'+(y+1)).css('background-color','antiquewhite');
    $('.row'+(x+1)+'.col'+(y-1)).css('background-color','antiquewhite');
    $('.row'+(x-1)+'.col'+(y+1)).css('background-color','antiquewhite');
    $('.row'+(x-1)+'.col'+(y-1)).css('background-color','antiquewhite');
}

function selectPiece(selected) {
	 'use strict';
    var temp = $(selected),
	temp2 = $('.checker'),
	moves;
	if (temp.attr('id') === turn)
	{
		temp2.attr('onmouseover','');
		temp2.attr('onmouseout','');
		temp2.attr('onclick','');
		temp.attr('onclick','deselectPiece(this)');
		moves = highlight(selected);
		for (var i in moves) {
			console.log(moves[i]);
			$('.row'+moves[i][0]+'.col'+moves[i][1]).attr('onclick',('movePieceTo(this)'));
			currentPiece = selected;
		}
		
	} else {
		alert('Not that players turn.');
	}
}

function deselectPiece(selected) {
	 'use strict';
	var temp = $('.checker');
    temp.attr('onmouseout','unhighlight(this)');
    temp.attr('onclick','selectPiece(this)');
    temp.attr('onmouseover','highlight(this)');
	$('.cell').attr('onclick','');
    unhighlight(selected);
	currentPiece = "";
}

function movePieceTo (square) {
	var selected = currentPiece;
	if ($(selected).attr('id') === 'redPiece') {
		$(square).html("<img src = \"assets/redChecker.gif\" class = \"checker\" id = \"redPiece\"></img>");
	} else  {
		$(square).html("<img src = \"assets/blackChecker.gif\" class = \"checker\" id = \"blackPiece\"></img>");
	}
	endTurn();
	deselectPiece(selected);
	$(selected).parent().html("");
}

function drawPieces() {
	 'use strict';
    var blackPiece = "<img src = \"assets/blackChecker.gif\" class = \"checker\" id=\"blackPiece\" onmouseover=highlight(this) onmouseout=unhighlight(this) onclick = selectPiece(this)></img>",
    redPiece = "<img src = \"assets/redChecker.gif\" class = \"checker\" id = \"redPiece\" onmouseover=highlight(this) onmouseout=unhighlight(this) onclick = selectPiece(this)></img>";
    $('.row0#whiteSquare').html(blackPiece);
    $('.row1#whiteSquare').html(blackPiece);
    $('.row2#whiteSquare').html(blackPiece);
    
    $('.row5#whiteSquare').html(redPiece);
    $('.row6#whiteSquare').html(redPiece);
    $('.row7#whiteSquare').html(redPiece);
};

drawBoard();
drawPieces();