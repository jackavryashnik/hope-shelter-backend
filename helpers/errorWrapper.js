const errorWrapper = error => {
  const err = new Error();
  err.statusCode = error.status || 500;
  err.message = error.message || 'Internal Server Error';

  return err;
};

export default errorWrapper;
