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
const {alertLoc} = require("./modules/util-loc");
const {zp, isoDate, js2Iso} = require("./modules/util-date");

// 정적 루트 설정
app.use("/", express.static("./public"));

// PUG 설정
app.set("view engine", "pug");
app.set("views", "./views");
app.locals.pretty = true;

// Router - GET
app.get("/user/:type", userGet); // wr, li

// Router - POST
app.post("/user/:type", userPost);


// Router CB - GET
function userGet(req, res) {
	const type = req.params.type;
	switch(type) {
		case "wr":
			const vals = {tit: "데이터 입력", subTit: "회원가입"};
			res.render("sql/insert", vals);
			break;
		case "li":
			(async () => {
				let sql = "SELECT * FROM users ORDER BY id DESC";
				let result = await sqlExec(sql);
				const vals = {
					tit: "데이터 출력", 
					subTit: "회원리스트", 
					datas: js2Iso(result[0], "wdate")
				};
				res.render("sql/list", vals);
			})();
			break;
		default:
			break;
	}
}

// Router CB - POST
function userPost(req, res) {
	const type = req.params.type;
	switch(type) {
		case "save":
			const username = req.body.username;
			const age = req.body.age;
			(async () => {
				let sql = "INSERT INTO users SET username=?, age=?, wdate=?";
				let sqlVals = [username, age, isoDate(new Date())];
				let result = await sqlExec(sql, sqlVals);
				res.send(alertLoc("저장되었습니다.", "/user/li"));
			})();
			break;
		default:
			break;
	}
}