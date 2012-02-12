EventEmitter = require('events').EventEmitter

"""
class GTPProtocol extends EventEmitter ->
    constructor: (@input, @output) ->

    respond: (msg) ->
        @output.write '= ' + msg + '\n'

    protocolVersion: (version=2) ->
        @respond version
"""

module.exports = (input) ->
    emitter = new EventEmitter()

    respond = (msg) ->
        console.log "= #{msg}\n"

    processCommand = (cmd) ->
        cmd = cmd.trim()
        return if cmd == ""
        args = cmd.split /\s/
        switch args[0]
            when 'play' then emitter.emit 'play', respond, args[2]
            when 'genmove' then emitter.emit 'genmove', respond
            when 'protocol_version' then respond('2')
            when 'boardsize' then respond('')
            when 'clear_board' then respond('') # TODO
            when 'version' then respond('0.1') # TODO
            when 'list_commands' then respond(
                ['boardsize', 'clear_board', 'genmove', 'list_commands',
                 'name', 'play', 'protocol_version', 'quit', 'version'].join '\n')
            when 'name' then respond('node-go-better-than-random') # TODO
            else console.log "? cannot handle: #{cmd}"
            
    input.on 'data', (data) ->
        commands = data.split /\r?\n\r?/
        processCommand cmd for cmd in commands
    
    return emitter
