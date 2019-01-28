require('dotenv').config();
const debug = require('debug')('app');
const { databaseConfig } = require('./common/config');
const { database } = require('./common/services');

database.connect(
  databaseConfig.url,
  databaseConfig.options,
);

const app = require('./app');

process.on('SIGINT', () => {
  database.connection.close(() => {
    process.exit(0);
  });
});

app.listen(process.env.SERVER_PORT, () => {
  debug(`Server listening on http://localhost:${process.env.SERVER_PORT}`);
});
