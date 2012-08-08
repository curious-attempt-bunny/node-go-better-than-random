var fs = require('fs');

module.exports = function Runner(input, output, debug) {
  var onInputData = function(data) {
    commands = data.split(/\r?\n\r?/);
    for(var i=0; i<commands.length; i++) {
      if (commands[i].length > 0) {
        onCommand(commands[i]);
      }
    }
  };

  // List of required commands here: http://www.lysator.liu.se/~gunnar/gtp/gtp2-spec-draft2/gtp2-spec.html
  var commandHandlers = {
    boardsize:     function(size) { /* TODO */ return ''; },
    clear_board:   function() { /* TODO */ return ''; },
    genmove:       function() { /* TODO */ return 'A1'; },
    known_command: function(command) { return commandHandlers.hasOwnProperty(command); },
    komi:          function(handicap) { /* TODO */ return ''; },
    list_commands: function() { return Object.keys(commandHandlers).sort().join("\n"); },
    name:          "node-go-better-than-random",
    play:          function() { /* TODO */ return ''; },
    protocol:      2,
    quit:          function() { process.exit(0); },
    version:       function() { return JSON.parse(fs.readFileSync('package.json'))['version'] }
  };

  var onCommand = function(command) {
    var response;
    var args = command.split(/ /);
    if (commandHandlers.hasOwnProperty(args[0])) {
      var handler = commandHandlers[args[0]];
      if (typeof(handler) == 'function') {
        response = handler.apply(this, args.slice(1));
      } else {
        response = handler;
      }
    } else {
      response = 'Did not recognize: "'+args[0]+'"';
    }
    respond(response.toString());
  };

  var respond = (typeof(output) == 'function' ? output : function(msg) { output.write(msg+'\n'); }); 

  input.on('data', onInputData);

  return undefined;
};

if (!module.parent) {
  module.exports(process.stdin, process.stdout, process.stderr);
  
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
}