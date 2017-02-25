const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  platform: String, // android, ios, etc. - lower case
  neura_token: String,
  push_token: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

module.exports = mongoose.model('User', userSchema);
