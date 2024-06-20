const express = require("express"); //express 라이브러리 사용하겠다. express 문법사용
const app = express();
// const path = require("path");
const server = require("http").createServer(app);
const cors = require("cors");
const bcrypt = require("bcrypt");

const { MongoClient } = require("mongodb");
const mongodb = require("mongodb");

// app.use(express.static(path.join(__dirname + "/renual_meriott/build/")));

let db;
const url =
  "mongodb+srv://97poolbbang:8cnxa7oAcl92rTjo@ssnalee.0yha3pm.mongodb.net/?retryWrites=true&w=majority&appName=ssnalee";
new MongoClient(url)
  .connect()
  .then((client) => {
    //mongodb 연결
    db = client.db("forum"); // forum 데이터베이스에 연결

    //서버 띄우기 , 서버띄울포트입력
    app.use(express.json());
    app.use(cors());

    //review 가져오기
    app.get("/api", async (req, res) => {
      let result = await db.collection("post").find().toArray();
      res.send({ list: result });
    });
    //review 저장하기
    app.post("/post", async (req, res) => {
      // console.log("req", result);
      let date = new Date();
      const utc = date.getTime()+ (date.getTimezoneOffset() * 60 * 1000);
      const KR_TIME_DIFF = 9* 60 * 60 *1000;
      const kr_date = new Date(utc + KR_TIME_DIFF);

      db.collection("post").insertOne({
        title: req.body.title,
        date: kr_date,
        overview: req.body.overview,
        star: req.body.star || 1,
        username: req.body.username,
      });
    });
     //review 삭제하기
     app.delete("/delete", async (req, res) => {
      //db.collection("post").findByIdAndDelete(req.body._id);
      db.collection("post").deleteOne({
        _id: new mongodb.ObjectId(req.body._id)
      },function(err,result){
        if(err){
          res.status(400).send({isSuccess : false});
        } else{
          res.status(200).semd({isSuccess : true })
        }
     });

    });

    //아이디 중복체크
    app.post("/idCheck", async (req, res, next) => {
      let result = await db
        .collection("userInfo")
        .countDocuments({ userId: req.body.userId });
      if (result === 0) {
        res.send({ isCheck: 1 });
      } else {
        res.send({ isCheck: -1 });
      }
    });

    //유저정보 가져오기
    app.post("/login", async (req, res, next) => {
      let result = await db
        .collection("userInfo")
        .findOne({ userId: req.body.userId });

      if (result) {
        let db_pw = result.userPw;
        bcrypt.compare(req.body.userPw, db_pw, (error, result) => {
          // console.log("res", result);
          if (result) res.send({ code: 1 });
          else res.send({ code: 0 });
        });
      } else {
        res.send({ code: 0 });
      }
    });

    //유저정보 저장
    app.post("/postUserInfo", async (req, res) => {
      const saltRounds = 10;
      bcrypt.hash(req.body.userPw, saltRounds, (err, hash) => {
        try {
          let userPw = hash;
          db.collection("userInfo").insertOne({
            userId: req.body.userId,
            userPw: userPw,
          });
        } catch {
          console.log("err: " + err);
        }
      });
    });

    //
  })
  .catch((err) => {
    console.log("err", err);
  });

// //간단한 서버기능. 누가 메인페이지 접속시 이거보내줘.
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/renual_meriott/build/index.html"));
// });

// 서버가 잘 동작하고 있는지 확인

server.listen(8080, () => {
  console.log("server is running on 8080");
});
