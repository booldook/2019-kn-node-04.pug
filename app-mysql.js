const express = require("express");
const app = express();
const port = 3000;
app.listen(port, ()=> {
  console.log("http://127.0.0.1:"+3000);
});

// node module
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

// my module
/*
const db = require("./modules/mysql-conn");
const mysql = db.mysql;
const conn = db.conn;
const sqlExec = db.sqlExec;
*/
const {mysql, conn, sqlExec} = require("./modules/mysql-conn");

// 정적 루트 설정
app.use("/", express.static("./public"));

// PUG 설정
app.set("view engine", "pug");
app.set("views", "./views");
app.locals.pretty = true;

// Router - GET
app.get("/insert/:type", insertGet);

// Router - POST
app.post("/insert/:type", insertPost);


// Router CB - GET
function insertGet(req, res) {
	const type = req.params.type;
	switch(type) {
		case "wr":
			const vals = {tit: "데이터 입력", subTit: "회원가입"};
			res.render("sql/insert", vals);
			break;
		case "li":
			break;
		default:
			break;
	}
}

// Router CB - POST
function insertPost(req, res) {
	
}