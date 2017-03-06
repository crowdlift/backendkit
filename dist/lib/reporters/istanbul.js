'use strict';

// From https://github.com/rollup/rollup-starter-project/blob/master/test/istanbul.reporter.js

var instanbul = require('istanbul');
var Base = require('mocha/lib/reporters/base');
var Spec = require('mocha/lib/reporters/spec');
var color = require('mocha/lib/reporters/base').color;

// Customize reporters as needed.
// Text reporter generates CLI output table.
var REPORTERS = ['html', 'json', 'text'];

function Reporter(runner) {
  var collector = new instanbul.Collector();
  var reporter = new instanbul.Reporter();
  reporter.addAll(REPORTERS);

  // eslint prefers Spec.call vs 'new Spec' when not assigning to a var
  Spec.call(Spec.prototype, runner);

  var passes = 0;
  var failures = 0;

  runner.on('pass', function () {
    return passes += 1;
  });
  runner.on('fail', function () {
    return failures += 1;
  });

  runner.on('end', function () {
    // eslint-disable-next-line no-underscore-dangle
    collector.add(global.__coverage__);

    reporter.write(collector, true, function () {
      var fmt = color('checkmark', Base.symbols.ok) + color('suite', ' %d  ') + color('fail', Base.symbols.err) + color('suite', ' %d  ');
      // eslint-disable-next-line no-console
      console.log(fmt, passes, failures);
    });
  });
}

module.exports = Reporter;