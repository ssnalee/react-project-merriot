const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:8080/",

      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/post", {
      target: "http://localhost:8080/",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/delete", {
      target: "http://localhost:8080/",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/login", {
      target: "http://localhost:8080/",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/postUserInfo", {
      target: "http://localhost:8080/",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/idCheck", {
      target: "http://localhost:8080/",
      changeOrigin: true,
    })
  );
};
