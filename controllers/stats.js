import Shelter from '../schemas/shelterModel.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import calculateCurrentGuests from '../helpers/calculateCurrentGuests.js';

const getStats = async (req, res, next, io) => {
  const stats = await Shelter.findOne();

  res.json({
    status: 'success',
    data: stats,
  });

  io.on('connection', socket => {
    const data = socket.on('clientEvent', data => data);
    socket.emit('bedsFetched', { message: 'beds' });
  });
};

const updateBeds = async (room, bedsTaken) => {
  const stats = await Shelter.findOne();

  if (stats && stats.rooms[room]) {
    const currentlyBedsTaken = stats.rooms[room].bedsTaken;

    if (bedsTaken > currentlyBedsTaken) {
      stats.totalGuests += bedsTaken - currentlyBedsTaken;
    }

    stats.rooms[room].bedsTaken = bedsTaken;
    stats.currentGuests = calculateCurrentGuests(stats.rooms);

    await stats.save();

    return json({
      status: 'success',
      data: stats,
    });
  } else {
    res.status(404).json({
      status: 'error',
      message: 'Room not found',
    });
  }
};

export default {
  getStats: ctrlWrapper((req, res, next) => getStats(req, res, next, req.io)),
  updateBeds: ctrlWrapper((req, res, next) =>
    updateBeds(req, res, next, req.io)
  ),
};
