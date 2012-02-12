readline = require 'readline'
rl = readline.createInterface(process.stdin, process.stdout)

staticResponses = {
    protocol_version: '2',
    name: 'go-engine',
    'boardsize 9': ' ',
    'clear_board': ' ',
    version: '0.1',
    list_commands: """boardsize
                      clear_board
                      genmove
                      list_commands
                      name
                      play
                      protocol_version
                      quit
                      version"""
}

rl.on 'line', (cmd) ->
    cmd = cmd.trim()
    resp = null
    
    process.exit(0) if cmd == 'quit'
    resp = staticResponses[cmd] if staticResponses[cmd]
    
    if resp != null
        console.log "= #{resp}\n" 
    else
        console.log "? no support for: #{cmd}"
    
###
TODO:

W>> play B D3
W<< = 
W<< 
W>> genmove w
W<< = E5
###    