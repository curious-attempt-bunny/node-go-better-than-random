var vows = require('vows');
var assert = require('assert');
var sinon = require('sinon');

var util = require('util');
var events = require('events');

var Runner = require('./../runner.js');

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
      }
    }    
  }
}).exportTo(module);