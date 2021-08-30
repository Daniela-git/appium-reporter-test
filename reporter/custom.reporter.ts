import WDIOReporter, {
  RunnerStats,
  SuiteStats,
  TestStats,
} from '@wdio/reporter';
import { Test } from 'mocha';

const agent = require('superagent');
const userName = 'Daniela-git';
const repoName = 'appium-reporter-test';
const urlBase = 'https://api.github.com';
const url = `${urlBase}/repos/${userName}/${repoName}/issues`;

interface dataToShare {
  uid: string;
  suitTitle: string;
  testTitle: string;
  state: string;
  retries: number;
  error: string | undefined;
  file: string;
}
module.exports = class CustomReporter extends WDIOReporter {
  constructor(options: any) {
    options = Object.assign(options, { stdout: true });
    super(options);
    console.log('The report starts here');
  }
  onTestFail(test: TestStats) {
    this.write(test.title);
  }
  async onSuiteEnd(suit: SuiteStats) {
    suit.tests.forEach(async (test) => {
      const data: dataToShare = {
        uid: suit.uid,
        suitTitle: suit.title,
        testTitle: test.title,
        state: test.state,
        retries: test.retries,
        error: undefined,
        file: suit.file,
      };
      if (test.error != undefined) {
        data.error = test.error.stack;
      }

      await this.sendTestResults(url, data);
    });
  }

  async sendTestResults(url: string, test: dataToShare) {
    await agent
      .post(url)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .send({
        title: `${test.suitTitle} ${test.testTitle}`,
        body: `uid: ${test.uid}, \n suit title: ${test.suitTitle}, \n test title: ${test.testTitle},\n state: ${test.state}, \n retries: ${test.state}, \n file: ${test.file}, \n error: ${test.error}`,
      })
      .then((res) => console.log(res.status));
  }
};
