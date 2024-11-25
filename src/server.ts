/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Server listening to ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
