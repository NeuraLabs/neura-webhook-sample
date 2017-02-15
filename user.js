const db = require('./db')

var userScheme = mongoose.Schema({
  neuraID : String,
  pushToken : String,
  dateCreated : Date
});

class user {
  this.user = mongoose.model('user', userScheme);

  saveUser(neuraID, pushToken, dateCreated) {
    var currentUser = new this.user({
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


