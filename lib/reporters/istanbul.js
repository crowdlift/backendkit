// From https://github.com/rollup/rollup-starter-project/blob/master/test/istanbul.reporter.js

const instanbul = require('istanbul');
const Base = require('mocha/lib/reporters/base');
const Spec = require('mocha/lib/reporters/spec');
const color = require('mocha/lib/reporters/base').color;

// Customize reporters as needed.
// Text reporter generates CLI output table.
const REPORTERS = ['html', 'json', 'text'];

function Reporter(runner) {
  const collector = new instanbul.Collector();
  const reporter = new instanbul.Reporter();
  reporter.addAll(REPORTERS);

  // eslint prefers Spec.call vs 'new Spec' when not assigning to a var
  Spec.call(Spec.prototype, runner);

  let passes = 0;
  let failures = 0;

  runner.on('pass', () => (passes += 1));
  runner.on('fail', () => (failures += 1));

  runner.on('end', () => {
    // eslint-disable-next-line no-underscore-dangle
    collector.add(global.__coverage__);

    reporter.write(collector, true, () => {
      const fmt =
        color('checkmark', Base.symbols.ok) +
        color('suite', ' %d  ') +
        color('fail', Base.symbols.err) +
        color('suite', ' %d  ');
      // eslint-disable-next-line no-console
      console.log(fmt, passes, failures);
    });
  });
}


module.exports = Reporter;
