const CustomReporter = require('./reporter/custom.reporter');
let { join } = require('path');
export const config: WebdriverIO.Config = {
  port: 4723,
  path: '/wd/hub',
  specs: ['./test/specs/**/*.ts'],
  exclude: [
    // 'path/to/excluded/files'
  ],
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 5,
      platformName: 'Android',
      'appium:deviceName': 'Pixel',
      'appium:app': join(process.cwd() + '/ApiDemos-debug.apk'),
      'appium:newCommandTimeout': 300000,
    },
  ],
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: 'silent',
  bail: 0,
  baseUrl: 'http://localhost',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['appium'],
  framework: 'mocha',
  reporters: [
    [
      CustomReporter,
      {
        someOption: 'foobar',
      },
    ],
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
};
