var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./memo');

function addMemo(userId,key,title,content,callback) {
    var sql = db.prepare("insert into memo(user_id,key_serial,title,content) values(?,?,?,?)");
    sql.run(userId,key,title,content,function(err){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();

}

function deleteMemo(id,callback) {
    var sql = db.prepare("delete from memo where id = ?");
    sql.run(id,function(err){
        if(!err){
            callback(id)
        }
        else
            console.log(err);
    });
    sql.finalize();

}
function updateMemo(id,title,content,callback) {
    var sql = db.prepare("update memo set title =?,content = ? where id =?");
    sql.run(title,content,id,function(err){
        if(!err){
            callback(id)
        }
        else
            console.log(err);
    });
    sql.finalize();

}

function getMemo(userId,key,callback) {
    var sql = db.prepare("select * from memo where user_id = ? and key_serial=?");
    sql.get(userId,key,function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();
}

function getMemoById(id,callback) {
    var sql = db.prepare("select * from memo where id = ?");
    sql.get(id,function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();
}


function getAllMemo(userId,callback) {
    var sql = db.prepare("select * from memo where user_id = ?");
    sql.all(userId,function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();

}

function getAllKey(userId,callback) {
  var sql = db.prepare("select key_serial from memo where user_id = ?");
  sql.all(userId,function(err,res){
    if(!err){
      callback(res)
    }
    else
      console.log(err);
  });
  sql.finalize();

}


function searchMemo(userId,title,callback) {
    var sql = db.prepare("select * from memo where user_id = ? and title like ?");
    sql.all(userId,'%'+title+'%',function(err,res){
        if(!err){
            callback(res)
        }
        else
            console.log(err);
    });
    sql.finalize();
}

module.exports.addMemo = addMemo
module.exports.deleteMemo = deleteMemo
module.exports.updateMemo = updateMemo
module.exports.getMemo = getMemo
module.exports.getMemoById = getMemoById
module.exports.getAllMemo = getAllMemo
module.exports.getAllKey = getAllKey
module.exports.searchMemo = searchMemo
