import WDIOReporter, {
  RunnerStats,
  SuiteStats,
  TestStats,
} from '@wdio/reporter';

module.exports = class CustomReporter extends WDIOReporter {
  constructor(options: any) {
    super(options);
    console.log('The report starts here');
  }
  onTestPass(test: TestStats) {
    console.log(`${test.title} ---- ${test.state}`);
  }
  onTestFail(test: TestStats) {
    console.log(`${test.title} HAS AN ERROR (T.T)`);
    console.log(`This is the error ${test.error}`);
  }
  onTestEnd(test: TestStats) {
    this.write(`\n ${test.title} ------- ${test.state}`);
  }
  onSuiteEnd(suit: SuiteStats) {
    console.log(suit.title);
    suit.tests.forEach((test) => {
      console.log(`${test.title}-----${test.state}`);
    });
  }
  onRunnerEnd(runner: RunnerStats) {
    console.log(runner.specs);
    console.log(runner.failures);
  }
};
