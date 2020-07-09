var conf = require("../db");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var $sql = require("../sqlMap");
var jwt = require("jsonwebtoken")

// import { transformTime } from '../../src/utils/methods'
var Func = require("../../src/utils/methods");

var jsonWrite = function(res, ret) {
  if (typeof ret === "undefined") {
    res.json({
      code: 1,
      msg: "操作失败"
    });
  } else {
    res.json(ret);
  }
};

// 使用连接池，提升性能
// var pool  = mysql.createPool($util.extend({}, $conf.mysql));
var pool = mysql.createPool(conf.mysql);

// 新增用户接口
router.post("/addUser", (req, res, next) => {
  let sql = $sql.user.add;
  let name = req.body.name;
  let age = +req.body.age;
  let description = req.body.description;
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    } else {
      connection.query(sql, [name, age, description], function(err, result) {
        if (err) {
          console.log("添加失败" + err);
        }
        if (result) {
          let data = {
            status: 200,
            statusText: "OK",
            code: "000000",
            msg: "新增成功"
          };
          jsonWrite(res, data);
        }
      });
      pool.releaseConnection(connection);
    }
  });
});
// 删除用户
router.delete("/delUser/:id", (req, res, next) => {
  // let sql = $sql.user.delete;
  console.log(req.params);
  console.log(req.body);
  console.log(req.query);

  let id = Number(req.params.id);
  let sql = "delete from user where id=" + id;
  console.log(sql);
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    } else {
      connection.query(sql, function(err, result) {
        if (err) {
          console.log("删除失败" + err);
        }
        if (result) {
          let data = {
            msg: "操作成功",
            code: "000000",
            status: 200
          };
          jsonWrite(res, data);
        }
      });
      pool.releaseConnection(connection);
    }
  });
});
//  获取用户列表
router.get("/getUserList", (req, res, next) => {
  console.log('-------------------------------')
  console.log(req.headers)
  jwt.verify(req.headers.token, 'beijing', (err, decode) => {
    if (err) { // token失效或伪造的token
      console.log('token err:', err)
      const data = {
        code: '401',
        message: '用户登录状态失效'
      }
      res.json(data)
    } else {
      let size = Number(req.query.pageSize);
      let num = req.query.pageNum;
      let user = req.query.name ? req.query.name + "%" : "%";
      let start = (num - 1) * size;
      // let sql = 'select * from user limit '+10+'offset'+0;
      // let sql = 'select count(*) from user; select * from user where name like '+ user+' limit '+start+','+size+';';
      let sql =
        "select count(*) from user where name like ?; select * from user where name like ? limit ?, ?";
      // 后期处理分页（传页码参数）
      pool.getConnection(function(err, connection) {
        if (err) {
          console.log(err);
        } else {
          connection.query(
            sql,
            ["%" + user + "%", "%" + user + "%", start, size],
            function(err, result) {
              if (err) {
                console.log(sql);
                console.log("获取列表失败" + err);
              }
              if (result) {
                let len = result[0][0]["count(*)"];
                let arr = [];
                if (result[1]) {
                  arr = Func.transformTime(result[1]);
                }
                let data = {
                  total: len,
                  list: arr,
                  status: 200,
                  statusText: "OK",
                  code: "000000"
                };
                // 时间转换
                jsonWrite(res, data);
              }
            }
          );
          pool.releaseConnection(connection);
        }
      });
    }
  })
  // if (req.headers.sessionid && req.headers.sessionid !== 'null') {
  //   // let sql = $sql.user.queryAll;
  //   // console.log(req)
    
  // } else {
    
  // }
  
});
// 编辑用户
router.patch("/updateUser", (req, res, next) => {
  console.log(req.body);
  let ids = req.body.id;
  let sql = "update user set name=?,age=?,address=? where id=" + ids;
  let params = [req.body.name, req.body.age, req.body.address];
  pool.getConnection(function(err, connection) {
    if (err) {
      console.log(err);
    } else {
      connection.query(sql, params, function(err, result) {
        if (err) {
          console.log(err);
        }
        if (result) {
          console.log(result);
          let data = {
            msg: "操作成功",
            code: "000000",
            status: 200
          };
          jsonWrite(res, data);
        }
      });
      pool.releaseConnection(connection);
    }
  });
});

module.exports = router;
