var EMPTY = 0;
var BLACK = 1;
var WHITE = -1;

module.exports = function Board(size) {
  var board = {
    legalMoves: function() {
      var moves = [];
      for(var i=0; i<occupied.length; i++) {
        if (!isEdge[i] && occupied[i] == EMPTY) {
          moves.push(notation[i]);
        }
      }
      return moves;
    }    
  }; 

  var offsets = [ -1, size+2, 1, -(size+2) ];
  
  var occupied = new Array((size+2)*(size+2));
  for(var i=0; i<occupied.length; i++) {
    occupied[i] = EMPTY; 
  }

  var isEdge = new Array(occupied.length);
  for(var i=0; i<=size+1; i++) {
    for(var j=0; j<=size+1; j++) {
      isEdge[i+((2+size)*j)] = (i == 0 || i == size+1 || j == 0 || j == size+1);
    }
  }

  var notation = new Array(occupied.length)  
  var letters = 'ABCDEFGHJKLMNOPQRST';
  for(var i=1; i<=size; i++) {
    for(var j=1; j<=size; j++) {
      notation[i+((2+size)*j)] = letters[i-1] + j.toString();
    }
  }
  
  return board;
};