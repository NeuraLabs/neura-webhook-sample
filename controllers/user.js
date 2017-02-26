/**
 * The users controller.
 * @requires user model
 */
const User = require('../models/user');

const userController = {
  findOne: (userId) => User.findOne({ _id: userId }),

  /**
   * createOrUpdate creates a user on the database
   * @param  {JSON} data holds the user data sent from the device
   * @return {user} the user object saved to the database
   */
  createOrUpdate: async (data) => {
    const existingUser = await User.findOne({
      neura_token: data.neura_token,
      platform: data.platform,
    });
    let user;
    console.log('create or update: ', existingUser);
    if (!existingUser) {
      user = await User.create({
        platform: data.platform,
        neura_token: data.neura_token,
        push_token: data.push_token,
      });
      return user;
    }

    existingUser.push_token = data.push_token;
    return existingUser.save();
  },
};

module.exports = userController;
