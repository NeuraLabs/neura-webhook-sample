/**
 * mongoose allows you to create a schema which immediately translated to an
 * object once imported from the database
 */
const mongoose = require('mongoose');

/**
 * userSchema - contains the needed properties of the user
 * @platform    {String} - android, ios, etc. - lower case (needed in the eventHandler)
 * @neura_token {String} - a token needed to get some info about the user using Neura's API
 * (not implemented in this sample)
 * @push_token  {String} - the token used by the push service to identify the device
 */
const userSchema = mongoose.Schema({
  platform: String,
  neura_token: String,
  push_token: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

module.exports = mongoose.model('User', userSchema);
