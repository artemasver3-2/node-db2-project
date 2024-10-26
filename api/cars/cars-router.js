const router = require('express').Router();
const md = require('./cars-middleware');
const Cars = require('./cars-model');

router.get('/', async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    res.json(cars);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', md.checkCarId, async (req, res, next) => {
  try {
    res.json(req.car);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  md.checkCarPayload,
  md.checkVinNumberUnique,
  md.checkVinNumberValid,
  async (req, res, next) => {
    try {
      const newCar = await Cars.create({
        vin: req.body.vin, 
        make: req.body.make, 
        model: req.body.model, 
        mileage: req.body.mileage,
        title: req.body.title, 
        transmission: req.body.transmission,
      })
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/:id',
  md.checkCarId,
  md.checkCarPayload,
  async (req, res, next) => {
    try {
      const updatedCar = await Cars.updateCar(req.params.id, req.body);
      res.json(updatedCar);
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id', md.checkCarId, async (req, res, next) => {
  try {
    await Cars.deleteCar(req.params.id, req.body);
    res.json(req.car);
  } catch (err) {
    next(err);
  }
});



module.exports = router;
