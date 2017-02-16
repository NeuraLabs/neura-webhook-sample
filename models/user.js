const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  platform: String, // Android, iOS, etc.
  neura_id: String,
  push_token: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

module.exports = mongoose.model('User', userSchema);
