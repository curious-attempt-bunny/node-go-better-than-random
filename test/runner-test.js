var vows = require('vows');
var assert = require('assert');
var sinon = require('sinon');

var util = require('util');
var events = require('events');

var Runner = require('./../lib/runner.js');

var send = function(command) {
  return function() {
    var input = new events.EventEmitter;
    var callback = this.callback
    Runner(input, {write: function(msg) { callback(null, msg); }});
    input.emit('data', command);
  };
};

vows.describe('runner').addBatch({
  'A runner': {
    // 'receiving a quit command': {
    //   // NOTE: this test does not work.
    //   'exits cleanly': sinon.test(function() {
    //     this.mock(process).expects("exit").once();

    //     input.emit('data', 'quit\n');
    //   })
    // },

    'with command': {
      'NAME': {
        topic: send('name'),

        'should respond with the engine name': function(err, result) {
          assert.equal(result, "node-go-better-than-random\n");
        }
      },

      'PROTOCOL': {
        topic: send('protocol'),

        'should respond with the protocol version': function(err, result) {
          assert.equal(result, "2\n");
        }
      },

      'VERSION': {
        topic: send('version'),

        'should respond with the version number': function(err, result) {
          assert.isNotNull(result);
        }
      },

      'LIST_COMMANDS': {
        topic: send('list_commands'),

        'should respond with the list of commands it accepts': function(err, result) {
          var actual_commands = result.trim().split(/\n/);
          var expected_commands = [
            'protocol', 'version', 'name', 'known_command', 'list_commands', 'quit', 
            'boardsize', 'clear_board', 'komi', 'play', 'genmove'
          ];
          assert.deepEqual(actual_commands.sort(), expected_commands.sort());
        }
      },

      'BOARDSIZE': {
        topic: send('boardsize 19'),

        'should respond with a blank line': function(err, result) {
          assert.equal(result, "\n");
        }
      },

      'CLEAR_BOARD': {
        topic: send('clear_board'),

        'should respond with a blank line': function(err, result) {
          assert.equal(result, "\n");
        }
      },

      'PLAY': {
        topic: send('play B D16'),

        'should respond with a blank line': function(err, result) {
          assert.equal(result, "\n");
        }
      },

      'GENMOVE': {
        topic: send('genmove w'),

        'should respond with a coordinate': function(err, result) {
          assert.ok(/([A-H,J-T](1[0-9]|[1-9]))|pass|resign/.test(result));
        }
      }
    }    
  }
}).exportTo(module);