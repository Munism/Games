var turn = 'redPiece',
    currentPiece;
	
function endTurn() {
    'use strict';
    if (turn === 'redPiece') {
        turn = 'blackPiece';
    } else {
        turn = 'redPiece';
    }
}

function makeSquare() {
    'use strict';
    var width = $('.cell').css('width');
    $('.cell').css('height', width);
}

function drawBoard() {
    'use strict';
	
    var row,
        column,
        start,
        color,
        toggle = function (input) {
            if (input === "white") {
                input = "black";
            } else {
                input = "white";
            }
            return input;
        };
    for (row = 0; row < 8; row += 1) {
        if (row % 2 === 0) {
            start = "white";
        } else {
            start = "black";
        }
        color = start;
        for (column = 0; column < 8; column += 1) {
            //console.log(color, row, column);
            $('.gameboard').append("<div class = \"cell row" + row + " col" + column + "\"id=\"" + color + "Square\"></div>");
            color = toggle(color);
        }
    }
	$('.cell').css({
		'width':'12.5%',
		'float':'left'});
    makeSquare();
	$('.cell#whiteSquare').css("background-color",'antiquewhite');
	$('.cell#blackSquare').css("background-color",'black');
}

function highlight(checker) {
    'use strict';
    var x,
        y,
        raw = ($(checker).parent().attr('class')).split(" "),
        color = $(checker).attr('id'),
        possibleMoves = [];
    x = ((raw[1].split(""))[3]) - 0;
    y = ((raw[2].split(""))[3]) - 0;
    if (color === "redPiece") {
        if ((y - 1) >= 0) {
            possibleMoves.push([x - 1, y - 1]);
        }
        if ((y - 1) <= 7) {
            possibleMoves.push([x - 1, y + 1]);
        }
    } else {
        if ((y - 1) >= 0) {
            possibleMoves.push([x + 1, y - 1]);
        }
        if ((y - 1) <= 7) {
            possibleMoves.push([x + 1, y + 1]);
        }
    }
    $('.row' + possibleMoves[0][0] + '.col' + possibleMoves[0][1]).css('background-color', 'purple');
    if (possibleMoves[1] !== undefined) {
        $('.row' + possibleMoves[1][0] + '.col' + possibleMoves[1][1]).css('background-color', 'purple');
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
    $('.row' + (x + 1) + '.col' + (y + 1)).css('background-color', 'antiquewhite');
    $('.row' + (x + 1) + '.col' + (y - 1)).css('background-color', 'antiquewhite');
    $('.row' + (x - 1) + '.col' + (y + 1)).css('background-color', 'antiquewhite');
    $('.row' + (x - 1) + '.col' + (y - 1)).css('background-color', 'antiquewhite');
}

function selectPiece(selected) {
    'use strict';
    var temp = $(selected),
        temp2 = $('.checker'),
        moves,
        i,
        length;
    if (temp.attr('id') === turn) {
        temp2.attr('onmouseover', '');
        temp2.attr('onmouseout', '');
        temp2.attr('onclick', '');
        temp.attr('onclick', 'deselectPiece(this)');
        moves = highlight(selected);
        length = moves.length;
        for (i = 0; i < length; i += 1) {
            $('.row' + moves[i][0] + '.col' + moves[i][1]).attr('onclick', ('movePieceTo(this)'));
            currentPiece = selected;
        }
    } else {
        alert('Not that players turn.');
    }
}

function deselectPiece(selected) {
    'use strict';
    var temp = $('.checker');
    temp.attr('onmouseout', 'unhighlight(this)');
    temp.attr('onclick', 'selectPiece(this)');
    temp.attr('onmouseover', 'highlight(this)');
    $('.cell').attr('onclick', '');
    unhighlight(selected);
    currentPiece = "";
}

function movePieceTo(square) {
    'use strict';
    var selected = currentPiece;
    if ($(selected).attr('id') === 'redPiece') {
        $(square).html("<img src = \"assets/redChecker.gif\" class = \"checker\" id = \"redPiece\"></img>");
    } else {
        $(square).html("<img src = \"assets/blackChecker.gif\" class = \"checker\" id = \"blackPiece\"></img>");
    }
	//kinda hamfisted, but works for now
	$('.checker').css({'width':'80%',
		'margin-left':'10%',
		'margin-right':'10%',
		'margin-top':'10%'});
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
	$('.checker').css({'width':'80%',
		'margin-left':'10%',
		'margin-right':'10%',
		'margin-top':'10%'});
}

drawBoard();
drawPieces();