import HttpError from '../helpers/httpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';

const getAllBeds = async (req, res, next, io) => {
  res.json({
    status: 'success',
    data: { message: 'Here are your data' },
  });

  io.emit('bedsFetched', { message: 'All beds data fetched' });
};

const updateBeds = async (req, res, next, io) => {
  res.json({
    status: 'success',
    data: { message: 'Data updated successfully' },
  });

  io.emit('bedsUpdated', { message: 'Beds data updated' });
};

export default {
  getAllBeds: ctrlWrapper((req, res, next) =>
    getAllBeds(req, res, next, req.io)
  ),
  updateBeds: ctrlWrapper((req, res, next) =>
    updateBeds(req, res, next, req.io)
  ),
};
