const express = require("express");
const router = express.Router();
const Weather = require("../model/weatherModel");

router.get("/", async (req, res) => {
  try {
    const suppliers = await Weather.find();
    res.json({ error: false, weather: suppliers });
  } catch (err) {
    res.json({
      error: true,
      error_msg: "No Data Found",
      response: err.toString(),
    });
  }
});

router.get("/:city", async (req, res) => {
    try {
        console.log(req.params.city)
        var value = req.params.city
      const response = await Weather.find({name: {$regex :  new RegExp(req.params.city, 'i') }});
      res.json({ error: false, response: response });
    } catch (err) {
      res.json({
        error: true,
        error_msg: "No Data Found",
        response: err.toString(),
      });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const response = await Weather.deleteOne({_id : req.params.id});
      res.json({ error: false, success_msg :"Successfully deleted" });
    } catch (err) {
      res.json({
        error: true,
        error_msg: "No Data Found",
        response: err.toString(),
      });
    }
  });

  router.get("/country/:country", async (req, res) => {
    try {
        
      const response = await Weather.find({country: {$regex : new RegExp(req.params.country, 'i')}});
      res.json({ error: false, response: response });
    } catch (err) {
      res.json({
        error: true,
        error_msg: "No Data Found",
        response: err.toString(),
      });
    }
  });


router.post("/add_weather", async (req, res) => {
  const suppliers = new Weather({
    temp: req.body.temp,
    feels_like: req.body.feels_like,
    temp_min: req.body.temp_min,
    temp_max: req.body.temp_max,
    pressure: req.body.pressure,
    humidity: req.body.humidity,
    sea_level: req.body.sea_level,
    grnd_level: req.body.grnd_level,
    name: req.body.name,
    country: req.body.country

  });
  try {
    const response = await suppliers.save();
    res.json({
      error: false,
      success_msg: "Data submitted successfully",
      response: response,
    });
  } catch (err) {
    res.json({
      error: true,
      error_msg: "No Data Found",
      response: err.toString(),
    });
  }
});
module.exports = router;
