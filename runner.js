module.exports = function Runner(input, output, debug) {
  var respond;

  var runner = {
    onInputData: function(data) {
      commands = data.split(/\r?\n\r?/);
      for(var i=0; i<commands.length; i++) {
        if (commands[i].length > 0) {
          // debug('>> '+commands[i]);
          runner.onCommand(commands[i]);
        }
      }
    },

    onCommand: function(command) {
      if (command === 'quit') {
        process.exit(0);
      } else if (command === 'name') {
        respond("node-go-better-than-random");
      } else {
        respond('Did not recognize: "'+command+'"');
      }
    }
  };

  respond = (typeof(output) == 'function' ? output : function(msg) { output.write(msg+'\n'); }); 

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

  input.on('data', runner.onInputData);

  return runner;
};

if (!module.parent) {
  module.exports(process.stdin, process.stdout, process.stderr);
  
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
}