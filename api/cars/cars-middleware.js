const Cars = require('./cars-model');

const checkCarId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const car = await Cars.checkCarId(id);
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
  if (!req.body.vin) return next({ status: 400, message: 'vin is missing' });
  if (!req.body.make) return next({ status: 400, message: 'make is missing' });
  if (!req.body.model)
    return next({ status: 400, message: 'model is missing' });
  if (!req.body.mileage)
    return next({ status: 400, message: 'mileage is missing' });
  next();
};

const checkVinNumberValid = (req, res, next) => {
  const vin = req.body.vin;
  if (`${vin}`.length != 17) {
    res.status(400).json({
      message: `vin: ${req.body.vin} is invalid`,
    });
  }
  next();
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const vin = req.body.vin;
    const takenVins = await Cars.getByVin(vin);

    if (!takenVins) {
      next();
    } else {
      next({
        status: 400,
        message: `vin: ${req.body.vin} already exists`,
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
