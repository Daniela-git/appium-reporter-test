export class OfflineDevice {
  async switchConnection(connection: number) {
    if (connection === 2) {
      await driver.toggleWiFi();
    } else if (connection === 4) {
      await driver.toggleData();
    } else if (connection === 6) {
      await driver.toggleData();
      await driver.toggleWiFi();
    }
  }

  async turnOffConnection() {
    const connection: number = await driver.getNetworkConnection();
    await this.switchConnection(connection);
  }
  async turnOnConnection(connection: number) {
    await this.switchConnection(connection);
  }
}
