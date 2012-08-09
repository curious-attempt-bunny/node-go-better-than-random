var EMPTY = 0;
var BLACK = 1;
var WHITE = -1;

module.exports = function Board(size) {
  var board = {
    legalMoves: function() {
      var moves = [];
      for(var i=0; i<occupied.length; i++) {
        if (!isEdge[i] && occupied[i] == EMPTY) {
          moves.push(i);
        }
      }
      return moves;
    },

    notate: function(moveOrMoves) {
      if (typeof(moveOrMoves) == 'number') {
        return notation[moveOrMoves];  
      }
      var notations = new Array(moveOrMoves.length);
      for(var i=0; i<moveOrMoves.length; i++) {
        notations[i] = notation[moveOrMoves[i]];
      }
      return notations;
    },

    reverseNotate: function(moveOrMoves) {
      if (typeof(moveOrMoves) == 'string') {
        return reverseNotation[moveOrMoves];  
      }
      var indexes = new Array(moveOrMoves.length);
      for(var i=0; i<moveOrMoves.length; i++) {
        indexes[i] = reverseNotation[moveOrMoves[i]];
      }
      return indexes;
    },

    next: function() {
      return nextPlayer;
    },

    notatePlayer: function(player) {
      return (player == WHITE ? 'w' : 'b');
    },

    play: function(player, index) {
      if (isEdge[index]) {
        throw "illegal move: board edge";
      }
      if (occupied[index] != EMPTY) {
        throw "illegal move: "+notatePlayer(player)+" at "+notate(index);
      }

      occupied[index] = player;
      nextPlayer = (nextPlayer == WHITE ? BLACK : WHITE);

      return board;
    },

    libertyCount: function(index) {
      return board.liberties(index).length;
    },

    liberties: function(index) {
      if (occupied[index] == EMPTY) {
        return 0;
      }
      var who = occupied[index];

      var liberties = [];
      var queue = [index];
      var explored = {};

      while(queue.length > 0) {
        var i = queue.pop();

        for(var k=0; k<offsets.length; k++) {
          var j = i+offsets[k];
          if (!explored[j]) {
            explored[j] = true;
            if (occupied[j] == who) {
              queue.push(j);
            } else if (occupied[j] == EMPTY && !isEdge[j]) {
              liberties.push(j);
            }
          }
        }
      }

      return liberties;
    }    
    
  }; 

  var nextPlayer = BLACK;

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

  var notation = new Array(occupied.length);
  var reverseNotation = {};
  var letters = 'ABCDEFGHJKLMNOPQRST';
  for(var i=1; i<=size; i++) {
    for(var j=1; j<=size; j++) {
      var k = i+((2+size)*j);
      var note = letters[i-1] + j.toString();
      notation[k] = note;
      reverseNotation[note] = k;
    }
  }

  // console.error(notation.toString());
  
  return board;
};
