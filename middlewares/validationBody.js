const validationBody = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const missed = error.message;
      error.status = 400;
      error.message = `missing required ${missed} field`;
      next(error);
    }
    next();
  };
};

export default validationBody;
