import HttpError from '../helpers/httpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';

const getAllBeds = async (req, res, next) => {
  res.json({
    status: 'success',
    data: { message: 'Here are your data' },
  });
};

const updateBeds = async (req, res, next) => {
  res.json({
    status: 'success',
    data: { message: 'Data updated successfully' },
  });
};

export default {
  getAllBeds: ctrlWrapper(getAllBeds),
  updateBeds: ctrlWrapper(updateBeds),
};
