const User = require('../models/user');

const userController = {
  findOne: (userId) => User.findOne({ _id: userId }),

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
