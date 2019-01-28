exports.url = process.env.DB_URL;

exports.options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: process.env.DB_POOL_SIZE,
};
