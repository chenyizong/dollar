var userConnection = require('./userConnection');
// userConnection.getAllUser(function (data) {
//   console.log(data)
// })
function print(data){
  console.log(data[0].id)
}

userConnection.getAllUser(print)

