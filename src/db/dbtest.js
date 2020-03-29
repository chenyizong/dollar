var userConnection = require('./userConnection');
userConnection.getAllUser(function (data) {
  console.log(data)
})
