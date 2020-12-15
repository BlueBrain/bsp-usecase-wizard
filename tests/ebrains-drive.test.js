const { drive } = require('../src/constants');

test('api url is correct', () => {
  expect(drive.DRIVE_API_URL).toBe('https://drive.ebrains.eu/api2');
});