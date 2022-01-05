const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/api/surveys", "/api/**", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );

  app.use(
    ["/api/surveys"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );

  app.use(
    ["/api/**"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );

  app.use(
    ["/api"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );

  app.use(
    ["/api/wx/point/taf/**"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );

  app.use(
    ["/api/wx/point/metar/**"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );

  app.use(
    ["/api/apt/**"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
