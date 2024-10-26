const Cars = require('./cars-model');

const checkCarId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const car = await Cars.getById(id);
    if (!car) {
      res.status(404).json({
        message: `car with id: ${id} is not found.`,
      });
    } else {
      req.car = car;
    }
  } catch (err) {
    next(err);
  }
  next();
};

const checkCarPayload = (req, res, next) => {
  if (!req.body.vin) {
    res.status(400).json({
      message: 'vin is missing',
    });
  }
  if (!req.body.make) {
    res.status(400).json({
      message: 'make is missing',
    });
  }
  if (!req.body.model) {
    res.status(400).json({
      message: 'model is missing',
    });
  }
  if (!req.body.mileage) {
    res.status(400).json({
      message: 'mileage is missing',
    });
  }
  next();
};

const checkVinNumberValid = (req, res, next) => {
  const vin = req.body.vin;
  if (vin.length === 17 && vin != /^[a-z]+$/) {
    next();
  } else {
    res.status(400).json({
      message: `vin ${req.body.vin} is invalid`,
    });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const takenVins = await Cars.getByVin(req.body.vin);
    if (!takenVins) {
      next();
    } else {
      res.status(400).json({
        message: `vin ${req.body.vin} already exists`,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
