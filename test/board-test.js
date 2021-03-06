var vows = require('vows');
var assert = require('assert');
var sinon = require('sinon');

var util = require('util');
var events = require('events');

var Board = require('./../lib/board.js');

vows.describe('board').addBatch({
  'A 3x3 board': {
    topic: function() { return Board(3) },

    'should have 9 legal moves': function (board) {
      assert.equal(board.legalMoves().length, 9, board.notate(board.legalMoves()).toString());
    },

    'should have expected move notation': function (board) {
      assert.ok(board.notate(board.legalMoves()).indexOf('A1') != -1, board.notate(board.legalMoves()).toString());
      assert.ok(board.notate(board.legalMoves()).indexOf('C3') != -1, board.notate(board.legalMoves()).toString());
    },

    'should notate an index correctly': function(board) {
      assert.equal(board.notate((5*1)+1+0), 'A1');
      assert.equal(board.notate((5*1)+1+1), 'B1');
      assert.equal(board.notate((5*2)+1+0), 'A2');
    },

    'should notate an array of indexes correctly': function(board) {
      assert.deepEqual(board.notate([(5*1)+1+0, (5*1)+1+1, (5*2)+1+0]), ['A1', 'B1', 'A2']);
    },

    'should be black to play': function(board) {
      assert.equal(board.notatePlayer(board.next()), 'b');
    },

    'should reverse notate correctly': function(board) {
      assert.equal((5*1)+1+0, board.reverseNotate('A1'));
      assert.equal((5*1)+1+1, board.reverseNotate('B1'));
      assert.equal((5*2)+1+0, board.reverseNotate('A2'));
    },

    'after a tengen move': {
      topic: function(board) { return Board(3).play(board.BLACK, board.reverseNotate('B2')); },

      'should have the correct liberty count': function(board) {
        assert.equal(board.libertyCount(board.reverseNotate('B2')), 4);
      },

      'should be white to play': function(board) {
        assert.equal(board.notatePlayer(board.next()), 'w');
      },

      'after another move by black that connects': {
        topic: function(board) { return board.play(board.BLACK, board.reverseNotate('B1')); },

        'should have the correct liberty count': function(board) {
          assert.equal(board.libertyCount(board.reverseNotate('B2')), 5);
        }
      }
    },

    'after a corner move by black': {
      topic: function(board) { return Board(3).play(board.BLACK, board.reverseNotate('A1')); },

      'should describe black as present in the corner': function(board) {
        assert.equal(board.describe(board.reverseNotate('A1')), 'X');
      },

      'white takes the first liberty': {
        topic: function(board) { return board.play(board.WHITE, board.reverseNotate('A2')); },        

        'should describe black as present in the corner': function(board) {
          assert.equal(board.describe(board.reverseNotate('A1')), 'X');
        },

        'white takes the second and final liberty': {
          topic: function(board) { return board.play(board.WHITE, board.reverseNotate('B1')); },                  

          'should describe black as captured in the corner': function(board) {
            assert.equal(board.describe(board.reverseNotate('A1')), '.');
          }
        }
      }
    }    
  },

  'A 19x19 board': {
    topic: Board(19),

    'should have 19^2 legal moves': function (board) {
      assert.equal(board.legalMoves().length, 19*19, board.notate(board.legalMoves()).toString());
    },

    'should have expected move notation': function (board) {
      assert.ok(board.notate(board.legalMoves()).indexOf('A1') != -1, board.notate(board.legalMoves()).toString());
      assert.ok(board.notate(board.legalMoves()).indexOf('T19') != -1, board.notate(board.legalMoves()).toString());
      assert.ok(board.notate(board.legalMoves()).indexOf('I1') == -1, board.notate(board.legalMoves()).toString());
    }
  }
}).exportTo(module);