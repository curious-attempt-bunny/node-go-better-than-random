coordToStr = (coord) -> coord.join '-'

class Go
    constructor: (@width, @height) ->
        @board = {}

    playMove: (player, pos) ->
        key = coordToStr coord
        if pos[0] >= @width || pos[0] < 0 || pos[1] >= @height || pos[1] < 0
            throw 'Invalid move: out of range'
        else if @board[key]
            throw 'Invalid move: piece already there'
        @board[key] = player

    canMove: (player, pos) ->
        key = coordToStr pos
        if pos[0] >= @width || pos[0] < 0 || pos[1] >= @height || pos[1] < 0
            false
        else if @board[key]
            false
        else
            true

module.exports = Go
