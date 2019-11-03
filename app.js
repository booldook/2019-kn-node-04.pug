const express = require("express");
const app = express();
const port = 3000;
app.listen(port, ()=> {
  console.log("http://127.0.0.1:"+3000);
});

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

app.get("/insertIn", insertIn);
function insertIn(req, res) {
  const vals = {tit: "데이터 입력", subTit: "회원가입"};
  res.render("sql/insert", vals);
}