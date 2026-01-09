import { sequelize } from './config/sequelizeConnection';

export const connectWithRetry = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ alter: true });
      console.log('Connected to Postgres via Sequelize');
      return;
    } catch (err) {
      console.log(err);
      console.log(`Retrying DB connection (${i + 1}/${retries})...`);
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
  console.error('Could not connect to DB after retries');
  process.exit(1);
};
