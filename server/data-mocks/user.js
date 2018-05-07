const usersMock = [
  {
    id: 1,
    name: 'Michael Carrick',
    birthday: new Date('28 July 1981'),
    location: 'Wallsend',
    photo: null,
  },
  {
    id: 2,
    name: 'Phil Jones',
    birthday: new Date('21 February 1992'),
    location: 'Preston',
    photo: null,
  },
  {
    id: 3,
    name: 'Ashley Young',
    birthday: new Date('09 July 1985'),
    location: 'Preston',
    photo: null,
  },
  {
    id: 4,
    name: 'Eric Bailly',
    birthday: new Date('12 April 1994'),
    location: 'Preston',
    photo: null,
  },
];

export function getRandomUser() {
  return usersMock[Math.floor(Math.random() * (usersMock.length - 1))];
}
