export class OfflineDevice {
  async switchConnection(connection: number) {
    if (connection === 2) {
      await driver.toggleWiFi();
      console.log('hi im 2');
    } else if (connection === 4) {
      await driver.toggleData();
      console.log('hi im 4');
    } else if (connection === 6) {
      await driver.toggleData();
      await driver.toggleWiFi();
      console.log('hi im 6');
    }
  }
  async turnOffConnection() {
    const connection: number = await driver.getNetworkConnection();
    this.switchConnection(connection);
  }
  async turnOnConnection(connection: number) {
    this.switchConnection(connection);
  }
}
