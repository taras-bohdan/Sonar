const devices = [
  {
    type: 'laptop',
    manufacturer: 'Sony',
  },
  {
    type: 'mobile',
    manufacturer: 'Apple',
  },
  {
    type: 'tablet',
    manufacturer: 'Microsoft',
  },
];


export function getRandomDevice() {
  return devices[Math.floor(Math.random() * (devices.length - 1))];
}
