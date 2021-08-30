import WDIOReporter, {
  RunnerStats,
  SuiteStats,
  TestStats,
} from '@wdio/reporter';

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
    // options = Object.assign(options, { stdout: true });
    super(options);
    console.log('The report starts here');
  }
  async onSuiteEnd(suit: SuiteStats) {
    this.write(suit.title);
    suit.tests.forEach(async (test) => {
      await this.sendTestResults(url, test);
    });
  }
  // async onRunnerEnd() {
  //   const suits = this.suites;
  //   for (const uid in suits) {
  //     const suit = suits[uid];
  //     const suitTests = suit.tests;
  //     suitTests.forEach(async (test) => {
  //       const data: dataToShare = {
  //         uid: suit.uid,
  //         suitTitle: suit.title,
  //         testTitle: test.title,
  //         state: test.state,
  //         retries: test.retries,
  //         error: test.error.stack,
  //         file: suit.file,
  //       };
  //       await this.sendTestResults2(url, data);
  //     });
  //   }
  // }

  async sendTestResults2(url: string, test: dataToShare) {
    await agent
      .post(url)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .send({
        title: `${test.suitTitle} ${test.testTitle}`,
        body: `uid: ${test.uid}, \n suit title: ${test.suitTitle}, \n test title: ${test.testTitle},\n state: ${test.state}, \n retires: ${test.state}, \n error: ${test.error}, \n file: ${test.file}`,
      })
      .then((res) => console.log(res.status));
  }
  async sendTestResults(url: string, test: TestStats) {
    await agent
      .post(url)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .send({
        title: `${test.fullTitle}`,
        body: `title: ${test.title}, \n state: ${test.state}, \n retires: ${test.state}, \n error: ${test.error.stack}`,
      })
      .then((res) => console.log(res.status));
  }
};
