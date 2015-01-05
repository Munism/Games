var turn = 'redPiece',
    currentPiece;

function extractXY(cell) {
    'use strict';
    var x,
        y,
        raw;
    if ($(cell).attr('class') === 'checker') {
        raw = ($(cell).parent().attr('class')).split(" ");
    } else {
        raw = ($(cell).attr('class')).split(" ");
    }
    x = ((raw[1].split(""))[3]) - 0;
    y = ((raw[2].split(""))[3]) - 0;
    return [x, y];
}

function endTurn() {
    'use strict';
    if (turn === 'redPiece') {
        turn = 'blackPiece';
    } else {
        turn = 'redPiece';
    }
}

function isOccupied(location) {
    'use strict';
    if ($(location).find('img').attr("id") !== undefined) {
        return $(location).find('img').attr("id");
    }
    return 'empty';
}

function makeSquare() {
    'use strict';
    var width = $('.cell').css('width');
    $('.cell').css('height', width);
    width = $('.gameboard').css('width');
    $('.gameboard').css('height', width);
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
            $('.gameboard').append("<div class = \"cell row" + row + " col" + column + "\"id=\"" + color + "Square\"></div>");
            color = toggle(color);
        }
    }
    $('.cell').css({
        'width': '12.5%',
        'float': 'left'
    });
    makeSquare();
    $('.cell#whiteSquare').css("background-color", 'antiquewhite');
    $('.cell#blackSquare').css("background-color", 'black');
}

function highlight(checker) {
    'use strict';
    var x,
        y,
        raw = ($(checker).parent().attr('class')).split(" "),
        color = $(checker).attr('id'),
        possibleMoves = [],
        temp,
        occ;
    x = ((raw[1].split(""))[3]) - 0;
    y = ((raw[2].split(""))[3]) - 0;
    if (color === "redPiece") {
        if ((y - 1) >= 0) {
            temp = $('.row' + (x - 1) + '.col' + (y - 1));
            occ = isOccupied(temp);
            if (occ === color) {
                //do nothing
            } else if (occ === 'empty') {
                possibleMoves.push([x - 1, y - 1]);
                temp.css('background-color', 'purple');
            } else {
                //ability to jump
                if (isOccupied($('.row' + (x - 2) + '.col' + (y - 2))) === 'empty') {
                    $('.row' + (x - 2) + '.col' + (y - 2)).css('background-color', 'blue');
                    possibleMoves.push([x - 2, y - 2]);
                }
            }
        }
        if ((y - 1) <= 7) {
            temp = $('.row' + (x - 1) + '.col' + (y + 1));
            occ = isOccupied(temp);
            if (occ === color) {
                //do nothing
            } else if (occ === 'empty') {
                possibleMoves.push([x - 1, y + 1]);
                temp.css('background-color', 'purple');
            } else {
                //ability to jump
                if (isOccupied($('.row' + (x - 2) + '.col' + (y + 2))) === 'empty') {
                    $('.row' + (x - 2) + '.col' + (y + 2)).css('background-color', 'blue');
                    possibleMoves.push([x - 2, y + 2]);
                }
            }
        }
    } else {
        if ((y - 1) >= 0) {
            temp = $('.row' + (x + 1) + '.col' + (y - 1));
            occ = isOccupied(temp);
            if (occ === color) {
            
            } else if (occ === 'empty') {
                possibleMoves.push([x +1, y - 1]);
                temp.css('background-color', 'purple');
            } else {
                //ability to jump
                if (isOccupied($('.row' + (x + 2) + '.col' + (y - 2))) === 'empty') {
                    $('.row' + (x + 2) + '.col' + (y - 2)).css('background-color', 'blue');
                    possibleMoves.push([x + 2, y - 2]);
                } else {
                    //do nothing
                }
            }
        }
        if ((y - 1) <= 7) {
            temp = $('.row' + (x + 1) + '.col' + (y +1));
            occ = isOccupied(temp);
            if (occ === color) {
                //do nothing
            } else if (occ === 'empty') {
                possibleMoves.push([x + 1, y + 1]);
                temp.css('background-color', 'purple');
            } else {
                //ability to jump
                if (isOccupied($('.row' + (x + 2) + '.col' + (y + 2))) === 'empty') {
                    $('.row' + (x + 2) + '.col' + (y + 2)).css('background-color', 'blue');
                    possibleMoves.push([x + 2, y + 2]);
                }
            }
        }
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
    $('.cell#whiteSquare').css('background-color', 'antiquewhite');
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
        if (moves.length === 0) {
            alert("This piece has nowhere to move!");
            deselectPiece(selected);
            return;
        }
        length = moves.length;
        for (i = 0; i < length; i += 1) {
            $('.row' + moves[i][0] + '.col' + moves[i][1]).attr('onclick', ('movePieceTo(this)'));
            currentPiece = selected;
        }
    } else {
        alert('Not that players turn.');
    }
}

function movePieceTo(square) {
    'use strict';
    var selected = currentPiece,
        x1,
        x2,
        y1,
        y2,
        x3,
        y3;
    if ($(selected).attr('id') === 'redPiece') {
        $(square).html("<img src = \"assets/redChecker.gif\" class = \"checker\" id = \"redPiece\"></img>");
    } else {
        $(square).html("<img src = \"assets/blackChecker.gif\" class = \"checker\" id = \"blackPiece\"></img>");
    }
    //kinda hamfisted, but works for now
    $('.checker').css({'width': '80%',
        'margin-left': '10%',
        'margin-right': '10%',
        'margin-top': '10%'});
    x1 = extractXY(selected)[0];
    y1 = extractXY(selected)[1];
    x2 = extractXY(square)[0];
    y2 = extractXY(square)[1];
    if (x1 - x2 === 2 || x1 - x2 === -2) {
        if (x1 > x2) {
            x3 = x2 + 1;
        } else {
            x3 = x1 + 1;
        }
        if (y1 > y2) {
            y3 = y2 + 1;
        } else {
            y3 = y1 + 1;
        }
        $('.row' + x3 + ".col" + y3).html("");
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
    $('.checker').css({'width': '80%',
        'margin-left': '10%',
        'margin-right': '10%',
        'margin-top': '10%'});
}

drawBoard();
drawPieces();