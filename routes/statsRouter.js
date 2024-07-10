import Shelter from '../schemas/shelterModel.js';

const handleSocketConnection = async socket => {
  const stats = await Shelter.findOne();

  socket.emit('bedsFetched', stats);

  socket.on('updateRoom', async ({ roomId, bedsTaken, beds }) => {
    if (roomId || bedsTaken || beds) {
      const result = await Shelter.updateOne(
        { _id: '668e446687a20aa914d196b6', 'rooms._id': roomId },
        { $set: { 'rooms.$.bedsTaken': bedsTaken, 'rooms.$.beds': beds } }
      );

      if (result.modifiedCount > 0) {
        const updatedStats = await Shelter.findOne();
        socket.broadcast.emit('bedsFetched', updatedStats);
        socket.emit('bedsFetched', updatedStats);
      }
    }
  });
};

export default handleSocketConnection;
