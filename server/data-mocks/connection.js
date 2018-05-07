const macAddressList = [
  '4D:26:24:87:07:51',
  '7C:3C:0C:51:30:F0',
  '3F:9F:E5:C8:10:77',
  '3A:14:D4:89:B0:00',
  '5F:E9:7C:87:EF:F9',
  '46:1F:22:66:8C:AD',
  '47:1A:3C:73:48:19',
  '3B:3B:11:93:F8:F0',
  '1C:48:2B:24:D8:5E',
  '00:82:28:02:AD:32',
  '6A:3A:30:D1:98:A0',
  '39:BE:68:AC:64:9A',
  'DE:44:9E:E0:41:14',
  '4E:67:03:7F:DA:4A',
  'A2:1E:16:2D:D0:7F',
  '95:6E:24:2D:BA:A2',
  'DD:45:4B:D8:69:28',
  '24:F4:E3:8F:C5:0D',
  '00:00:E3:2A:27:F1',
  'F6:AC:F4:19:9D:52',
  'F6:AC:F4:19:9D:52',
];

function generateSignals(number) {
  return Array(number).fill(null).map((d, i) => ({
    point: {
      name: `access point ${i}`,
      placement: {
        lat: i,
        lon: i,
      },
      group: `test group`,
    },
    signalStrength: Math.random(),
  }));
}

/**
 * get random MAC address from MAC mock
 * @returns {string}
 */
function getRandomMac() {
  return macAddressList[Math.floor(Math.random() * macAddressList.length)];
}

export function getRandomConnectionInfo() {
  return {
    mac: getRandomMac(),
    signals: generateSignals(4),
  };
}