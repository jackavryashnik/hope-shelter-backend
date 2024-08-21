import calculateCurrentGuests from '../helpers/calculateCurrentGuests.js';
import Shelter from '../schemas/shelterModel.js';

const handleSocketConnection = async socket => {
  const stats = await Shelter.findOne();

  socket.emit('bedsFetched', stats);

  socket.on('updateRoom', async ({ roomId, bedsTaken, beds }) => {
    if (roomId || bedsTaken || beds) {
      const room = stats.rooms.find(room => room._id.toString() === roomId);

      if (room) {
        const currentlyBedsTaken = room.bedsTaken;

        if (bedsTaken > currentlyBedsTaken) {
          stats.totalGuests += bedsTaken - currentlyBedsTaken;
        }

        room.bedsTaken = bedsTaken;
        room.beds = beds;
      }

      stats.currentGuests = calculateCurrentGuests(stats.rooms);

      await stats.save();

      socket.emit('bedsFetched', stats);
      socket.broadcast.emit('bedsFetched', stats);
    }
  });
};

export default handleSocketConnection;
