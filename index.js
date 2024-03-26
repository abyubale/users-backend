import 'dotenv/config';
import express from 'express';

const app = express();

app.use((req, res, next) => {
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

app.get('/api/weather-details', async (req, res) => {
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

app.listen(8002, () => {
  console.log('server is listening....');
});
