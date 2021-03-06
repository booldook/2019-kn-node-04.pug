const express = require("express");
const app = express();
const port = 3000;
app.listen(port, ()=> {
  console.log("http://127.0.0.1:"+3000);
});

// mysql.js
const mysql = require('mysql');
const conn = mysql.createPool({
  host: "localhost",
  port: 3307,
  user: "test",
  password: "000000",
  database: "node",
  connectionLimit: 10
});
/* var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'test',
  port     : '3307',
  password : '000000',
  database : 'node'
}); */

// util module
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

// 정적 루트 설정
app.use("/", express.static("./public"));

// PUG 설정
app.set("view engine", "pug");  // View Engine 지정
app.set("views", "./views");  // View가 저장된 폴더 지정
app.locals.pretty = true; // response 되는 소스를 이쁘게...

const users = [
  {id: 1, name: "홍길동", age: 25},
  {id: 2, name: "홍길순", age: 28},
  {id: 3, name: "홍길만", age: 32},
];

app.get(["/pug", "/pug/:type"], (req, res) => {
  let name = req.query.name;
  let titleChk = req.query.titleChk;
  let type = req.params.type;
  const vals = {name, title: "PUG연습", users, titleChk};
  switch(type) {
    case "include":
      res.render("include", vals);
      break;
    default:
      res.render("block", vals);
      break;
  }
});

app.get(["/api", "/api/:type"], (req, res) => {
  let type = req.params.type; // undefined
  if(!type) type = "list";  
  switch(type) {
    case "list": 
      res.json({
        result : users
      });
      break;
    default :
      break;
  }
});

app.get(["/date", "/date/:type"], (req, res) => {
  let type = req.params.type;
  if(!type) type = "ts";
  switch(type) {
    case "ts":
      res.send('<h1>'+String(new Date().getTime())+'</h1>');
      break;
    default:
      res.send('<h1>'+String(new Date())+'</h1>');
      break;
  }
});

app.get("/insert-in", insertIn);
function insertIn(req, res) {
  const vals = {tit: "데이터 입력", subTit: "회원가입"};
  res.render("sql/insert", vals);
}

// 기본적인 mysql 처리 - createConnection()
app.post("/insert/:type", insertFn);
function insertFn(req, res) {
  const type = req.params.type;
  switch(type) {
    case "save":
      var username = req.body.username;
      var age = req.body.age;
      var wdate = "2019-11-03 11:55:55";
      //var sql = `INSERT INTO users SET username="${username}", age=${age}, wdate="${wdate}"`;
      var sql = "INSERT INTO users SET username=?, age=?, wdate=?";
      var sqlVals = [username, age, wdate];
      conn.connect();
      conn.query(sql, sqlVals, function (error, results, fields) {
        if (error) {
          console.log(error)
          res.send("Error");
        }
        else {
          console.log('The solution is: ', results);
          if(results.affectedRows == 1) {
            res.send("잘 저장 되었습니다.");
          }
          else {
            res.send("데이터 저장에 실패하였습니다.");
          }
        }
      });
      conn.end();

      break;
    case "save-pool":
      var username = req.body.username;
      var age = req.body.age;
      var wdate = "2019-11-03 11:55:55";
      var sql = "INSERT INTO users SET username=?, age=?, wdate=?";
      var sqlVals = [username, age, wdate];
      conn.getConnection((error, connect) => {
        if(error) console.log(error);
        else {
          connect.query(sql, sqlVals, (error, results, fields) => {
            if(error) console.log(error);
            else {
              res.json(results);
            }
            connect.release();
          });
        }
      });
      break;
    default:
      res.send("취소");
      break;
  }
}