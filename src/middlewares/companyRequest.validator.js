const validator = (schema, property) => (req, res, next) => {
  const { error } = schema.validate(req[property]);

  if (error) {
    res.status(400).json({ message: error.message });
  } else {
    next();
  }
};

module.exports = { validator };
