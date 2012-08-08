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
      assert.equal(board.legalMoves().length, 9, board.legalMoves().toString());
    },

    'should have expected move notation': function (board) {
      assert.ok(board.legalMoves().indexOf('A1') != -1, board.legalMoves().toString());
      assert.ok(board.legalMoves().indexOf('C3') != -1, board.legalMoves().toString());
    }
  },

  'A 19x19 board': {
    topic: new Board(19),

    'should have 19^2 legal moves': function (board) {
      assert.equal(board.legalMoves().length, 19*19, board.legalMoves().toString());
    },

    'should have expected move notation': function (board) {
      assert.ok(board.legalMoves().indexOf('A1') != -1, board.legalMoves().toString());
      assert.ok(board.legalMoves().indexOf('T19') != -1, board.legalMoves().toString());
      assert.ok(board.legalMoves().indexOf('I1') == -1, board.legalMoves().toString());
    }
  }
}).exportTo(module);