stdin = process.openStdin()
stdin.setEncoding('utf8')
gtp = require('./gtp')(stdin)

gtp.on 'play', (respond, coord) ->
    console.error "Move played #{coord}"
    
gtp.on 'genmove', (respond) ->
    console.error "Call to arms!"