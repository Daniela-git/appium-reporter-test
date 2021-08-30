import { Alerts, OfflineDevice } from '../../pageObject';
const { expect, assert } = require('chai');

describe('test offline devices', () => {
  let offlineDevice: OfflineDevice = new OfflineDevice();
  let alerts: Alerts = new Alerts();
  beforeEach(async () => {
    await offlineDevice.turnOffConnection();
  });
  it("the device should't has connection", async () => {
    expect(await driver.getNetworkConnection()).to.equal(0);
  });

  describe('turn on the data', () => {
    beforeEach(async () => {
      await alerts.app.click();
      await offlineDevice.turnOnConnection(4);
      await alerts.alertDialog.click();
    });
    it('the device should has data', async () => {
      expect(await driver.getNetworkConnection()).to.equal(2);
    });
    it('get the title', async () => {
      assert.include(await alerts.getTitle, 'App/Alert Dialogs');
    });
  });

  afterEach(async () => {
    await driver.reset();
  });
});
