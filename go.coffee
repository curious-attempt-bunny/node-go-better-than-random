_ = require 'underscore'

coordToStr = (coord) -> coord.join '-'

class Go
    constructor: (@width, @height) ->
        @board = {}

    playMove: (player, coord) ->
        key = coordToStr coord
        if coord[0] >= @width || coord[0] < 0 || coord[1] >= @height || coord[1] < 0
            throw 'Invalid move: out of range'
        else if @board[key]
            throw 'Invalid move: piece already there'
        @board[key] = player

    canMove: (player, coord) ->
        key = coordToStr coord
        if coord[0] >= @width || coord[0] < 0 || coord[1] >= @height || coord[1] < 0
            false
        else if @board[key]
            false
        else
            true

    legalMoves: (player) ->

    getScore: () ->
        
    clone: () ->
        game = new Go(@width, @height)
        game.board = Object.create @board

        @board = Object.create @board

module.exports = Go

if !module.parent
    game = new Go

    console.log game.canMove(1, [2, 3])
    game.playMove(1, [2, 3])
    console.log game.canMove(1, [2, 3])
