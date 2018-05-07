import { getRandomUser } from './user';
import { getRandomDevice } from './device';
import { getRandomConnectionInfo } from './connection';

function getRandomDate() {
  // 27.77777777778 h (hour)
  const timeRange = 100000000;
  return new Date(+(new Date()) - Math.floor(Math.random() * timeRange));
}

function generateRandomUserData() {
  return {
    user: getRandomUser(),
    connection: getRandomConnectionInfo(),
    device: getRandomDevice(),
    date: getRandomDate(),
  };
}

export function generateData(num) {
  return new Array(num).fill(null).map(generateRandomUserData);
}

