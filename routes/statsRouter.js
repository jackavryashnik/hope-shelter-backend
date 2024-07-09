import Shelter from '../schemas/shelterModel.js';

const handleSocketConnection = async socket => {
  const stats = await Shelter.findOne();

  socket.emit('bedsFetched', stats);

  socket.on('updateBedsTaken', async ({ roomId, bedsTaken }) => {
    if (roomId && bedsTaken) {
      const result = await Shelter.updateOne(
        { _id: '668cec5b34ae8c18b72893fd', 'rooms._id': roomId },
        { $set: { 'rooms.$.bedsTaken': bedsTaken } }
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
