var fs = require('fs');

module.exports = function Runner(input, output, debug) {
  var onInputData = function(data) {
    commands = data.split(/\r?\n\r?/);
    for(var i=0; i<commands.length; i++) {
      if (commands[i].length > 0) {
        // debug('>> '+commands[i]);
        onCommand(commands[i]);
      }
    }
  };

  var commandHandlers = {
    quit: function() { process.exit(0); },
    name: "node-go-better-than-random",
    protocol: 2,
    version: function() { return JSON.parse(fs.readFileSync('package.json'))['version'] },
    list_commands: function() { return Object.keys(commandHandlers).sort().join("\n"); }
  };

  var onCommand = function(command) {
    var response;
    if (commandHandlers.hasOwnProperty(command)) {
      var handler = commandHandlers[command];
      if (typeof(handler) == 'function') {
        response = handler();
      } else {
        response = handler.toString();
      }
    } else {
      response = 'Did not recognize: "'+command+'"';
    }
    respond(response);
  };

  var respond = (typeof(output) == 'function' ? output : function(msg) { output.write(msg+'\n'); }); 

  // respond = function(_respond) {
  //   return function(msg) {
  //     debug('<< '+msg);
  //     _respond(msg);
  //   };
  // }(respond);
  
  // debug = function(_debug) {
  //   return function(msg) {
  //     if (_debug) {
  //       _debug(msg);
  //     }
  //   };
  // }(debug);

  input.on('data', onInputData);

  return undefined;
};

if (!module.parent) {
  module.exports(process.stdin, process.stdout, process.stderr);
  
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
}