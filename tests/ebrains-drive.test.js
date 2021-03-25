
import { drive } from '@/constants';

test('api url is correct', () => {
  expect(drive.DRIVE_API_URL).toBe('https://drive.ebrains.eu/api2');
});


// TODO: test the API with authentication
