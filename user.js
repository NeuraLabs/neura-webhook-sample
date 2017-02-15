const db = require('./db')

var userScheme = mongoose.Schema({
  platform: String, // Android, iOS, etc.
  neuraID : String,
  pushToken : String,
  dateCreated : Date
});

class user {
  this.user = mongoose.model('user', userScheme);

  saveUser(platform, neuraID, pushToken, dateCreated) {
    var currentUser = new this.user({
      platform: platform,
      neuraID: neuraID, 
      pushToken: pushToken, 
      dateCreated: dateCreated
    });

    currentUser.save(function (err, currentUser) {
      if (err) return console.error(err);
      console.log(currentUser)
    });
  }
}


