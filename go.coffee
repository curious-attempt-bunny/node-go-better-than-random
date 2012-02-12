_ = require 'underscore'
assert = require 'assert'

coordToStr = (coord) -> coord.join '-'

class Go
    constructor: (@size) ->
        @board = {}

    playMove: (player, coord) ->
        key = coordToStr coord
        if coord[0] >= @size or coord[0] < 0 or coord[1] >= @size or coord[1] < 0
            throw 'Invalid move: out of range'
        else if @board[key]
            throw 'Invalid move: piece already there'
        @board[key] = player

    canMove: (player, coord) ->
        key = coordToStr coord
        !(coord[0] >= @size or coord[0] < 0 or coord[1] >= @size \
            or coord[1] < 0 or @board[key]?)

    legalMoves: (player) ->
        (([x, y] for x in [0...@size]) for y in [0...@size] \
            when not @board[coordToStr [x, y]]?)

    smartMoves: (player) ->
        # TODO: return moves that won't be immediately captured, or any other
        #       easily testable dumb mistakes.
        @legalMoves player

    getScore: ->
        "you're awesome!"

    clone: ->
        game = new Go(@size)
        game.board = _.clone @board

module.exports = Go

if !module.parent
    game = new Go

    assert.equal game.canMove(1, [-1, 3]), false
    assert.equal game.canMove(1, [-1, 3]), false
    assert.equal game.canMove(1, [3, -2]), false

    assert.equal game.canMove(1, [2, 3]), true
    game.playMove(1, [2, 3])
    assert.equal game.canMove(1, [2, 3]), false
