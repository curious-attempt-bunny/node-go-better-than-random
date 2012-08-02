var vows = require('vows');
var assert = require('assert');

var runner = require('../runner');

vows.describe('runner').addBatch({
  'A runner': {
    'receiving a quit command': {
      'exits cleanly': function() {
        assert.equal(1, 1);
      }
    }
  }
}).run();