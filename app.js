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


app.get("/pug", (req, res) => {
  let name = req.query.name;
  const users = [
    {id: 1, name: "홍길동", age: 25},
    {id: 2, name: "홍길순", age: 28},
    {id: 3, name: "홍길만", age: 32},
  ];
  const vals = {name, title: "PUG연습", users};
  res.render("sample", vals);
});