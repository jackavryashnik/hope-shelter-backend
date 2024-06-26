import errorWrapper from './errorWrapper.js';

const ctrlWrapper = ctrl => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      console.log('ctrlWrapper', error);
      next(errorWrapper(error));
    }
  };
  return func;
};

export default ctrlWrapper;
