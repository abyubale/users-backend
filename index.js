import 'dotenv/config';
import app from './src/app.js';
import mongoose from 'mongoose';

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log('DB connected'))
  .catch((err) => {
    console.error('Error connecting to mongoose', err);
  });

app.listen(process.env.PORT, () => {
  console.log('server is listening....');
});
