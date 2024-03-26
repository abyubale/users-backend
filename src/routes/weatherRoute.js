import express from 'express';

const weatherRoute = express.Router();

weatherRoute.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

weatherRoute.get('/', async (req, res) => {
  const { city, lat, lon } = req.query;

  if (city) {
    const getWeatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=${process.env.WEATHER_API_KEY}`
    ).then((data) => data.json());
    res.json(getWeatherData);
  }
  if (lat && lon) {
    const getWeatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&l&appid=${process.env.WEATHER_API_KEY}`
    ).then((data) => data.json());
    res.json(getWeatherData);
  }
});

export default weatherRoute;
