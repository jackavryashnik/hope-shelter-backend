const calculateCurrentGuests = rooms => {
  let currentGuests = 0;

  const keys = Object.keys(rooms);

  for (let index = 0; index < keys.length; index++) {
    currentGuests += rooms[keys[index]].bedsTaken;
  }

  return currentGuests;
};

export default calculateCurrentGuests;
