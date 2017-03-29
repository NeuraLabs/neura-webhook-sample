/**
 * a simple db connection function under mongoose
 */
const mongoose = require('mongoose');

module.exports = function connectDatabase(uri) {
  return new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', (error) => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.Promise = global.Promise;
    mongoose.connect(uri);
  });
};
