//server.js render 배포로 proxy 필요 x

// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {


  // app.use(
  //   createProxyMiddleware(["/api","/login","/postUserInfo","/idCheck","/post","/delete"], {
  //     // target: "http://localhost:8080/",
  //     target: "http://59.9.169.119:8080/",
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   createProxyMiddleware("/api", {
  //     target: "http://localhost:8080/",

  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   createProxyMiddleware("/post", {
  //     target: "http://localhost:8080/",
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   createProxyMiddleware("/delete", {
  //     target: "http://localhost:8080/",
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   createProxyMiddleware("/postUserInfo", {
  //     target: "http://localhost:8080/",
  //     changeOrigin: true,
  //   })
  // );
  // app.use(
  //   createProxyMiddleware("/idCheck", {
  //     target: "http://localhost:8080/",
  //     changeOrigin: true,
  //   })
  // );
// };
