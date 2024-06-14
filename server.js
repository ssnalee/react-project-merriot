const express = require("express"); //express 라이브러리 사용하겠다. express 문법사용
const app = express();
// const path = require("path");
const server = require("http").createServer(app);
const cors = require("cors");

const { MongoClient } = require("mongodb");

// app.use(express.static(path.join(__dirname + "/renual_meriott/build/")));

let db;
const url =
  "mongodb+srv://97poolbbang:8cnxa7oAcl92rTjo@ssnalee.0yha3pm.mongodb.net/?retryWrites=true&w=majority&appName=ssnalee";
new MongoClient(url)
  .connect()
  .then((client) => {
    //mongodb 연결
    db = client.db("forum"); // forum 데이터베이스에 연결
    console.log("탔다");
    //서버 띄우기 , 서버띄울포트입력
    app.use(express.json());
    app.use(cors());
    app.get("/api", async (req, res) => {
      let result = await db.collection("post").find().toArray();
      res.send({ list: result });
    });
  })
  .catch((err) => {
    console.log("err", err);
  });

// //간단한 서버기능. 누가 메인페이지 접속시 이거보내줘.
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/renual_meriott/build/index.html"));
// });

app.get("/post", async (req, res) => {
  console.log(req,'req')
   db.collection("post").insertOne(req);
});
// 서버가 잘 동작하고 있는지 확인

server.listen(8080, () => {
  console.log("server is running on 8080");
});
