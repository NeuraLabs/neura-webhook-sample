const User = require('../models/user');

const userController = {
  findOne: (neuraId) => new User.findOne({ neura_id: neuraId }),

  createOrUpdate: async (data) => {
    const existingUser = await User.findOne({ neura_id: data.neura_id });
    let user;
    console.log('create or update: ', existingUser);
    if (!existingUser) {
      user = await User.create({
        platform: data.platform,
        neura_id: data.neura_id,
        push_token: data.push_token,
      });
    } else {
      user = await User.update({ neura_id: data.neura_id }, {
        platform: data.platform,
        neura_id: data.neura_id,
        push_token: data.push_token,
      });
    }
    return user;
  },
};

module.exports = userController;
