var vows = require('vows');
var assert = require('assert');
var sinon = require('sinon');

var util = require('util');
var events = require('events');

var Board = require('./../lib/board.js');

vows.describe('board').addBatch({
  'A 3x3 board': {
    topic: new Board(3),

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
  },

  'A 19x19 board': {
    topic: new Board(19),

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