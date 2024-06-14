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

// app.get("/post", async (req, res) => {
//   db.collection("post").insertOne({
//     title: "Best service you can get at a 5 star hotel!",
//     content:
//       "I've stayed at quite a bit of Marriott hotels all over the US. But experiences at JW Marriott Seoul is by far the best. First, losing the passport abroad is a frightening experience while traveling with my family. But the hotel staff, Kyrie Cho worked swiftly and effectively to find it in one of the three possible shops that could've had the passport and delivered it in the fastest possible way to the airport in time for our travel back to the US. This is not at all expected and I was really shocked at the level of dedication and service JW Marriott provided. I have returned to Korea and extended my stay at this hotel due to this extremely positive, heart-warming experience. I recommend highly to check out this hotel.",
//     date: "20240101",
//     name: "Eunice Park",
//     score: 4,
//   });
// });
// 서버가 잘 동작하고 있는지 확인

server.listen(8080, () => {
  console.log("server is running on 8080");
});
