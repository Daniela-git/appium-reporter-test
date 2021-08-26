import WDIOReporter, {
  RunnerStats,
  SuiteStats,
  TestStats,
} from '@wdio/reporter';

module.exports = class CustomReporter extends WDIOReporter {
  constructor(options: any) {
    super(options);
    console.log(options);
  }
  onTestPass(pass: TestStats) {
    console.log(`${pass.title} ---- ${pass.state}`);
  }
  onTestFail(test: TestStats) {
    console.log(test.title);
    console.log(`This is the error ${test.error}`);
  }
  onTestEnd(end: TestStats) {
    this.write(`\n ${end.title} ------- ${end.state}`);
  }
  onSuiteEnd(test: SuiteStats) {
    console.log(test.title);
    test.tests.forEach((element) => {
      console.log(`${element.title}-----${element.state}`);
    });
  }
  onRunnerEnd(test: RunnerStats) {
    console.log(test.specs);
    console.log(test.failures);
  }
};
