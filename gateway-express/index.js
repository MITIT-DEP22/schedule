const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const {
  createProxyMiddleware,
  fixRequestBody,
} = require("http-proxy-middleware");
const https = require("https");
const fs = require("fs");
const { env } = require("process");
let dotenv = require("dotenv").config();

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS.replace(/\n/g, "")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins.includes("*") ? "*" : allowedOrigins,
    credentials: true,
  })
);

const checkPassword = (req, res, next) => {
  const password = req.headers["x-api-password"]; // Перевіряємо заголовок x-api-password
  const correctPassword = process.env.API_PASSWORD; // Отримуємо пароль з середовища
  if (password && password === correctPassword) {
    next(); // Пароль вірний, продовжуємо обробку запиту
  } else {
    res.status(403).json({
      code: 403,
      status: "Error",
      message: "Access denied. Invalid or missing API password.",
      data: new Date(),
    });
  }
};

app.use(checkPassword);

app.use(helmet()); // Add security headers
app.use(morgan("combined")); // Log HTTP requests
app.disable("x-powered-by"); // Hide Express server information

const services = [
  {
    route: process.env.API_GATEWAY_BACKEND_ROUTE,
    target: `${process.env.API_GATEWAY_BACKEND_PROTOCOL}://${process.env.API_GATEWAY_BACKEND_TARGET}`,
  },
  {
    route: process.env.API_GATEWAY_PARSER_ROUTE,
    target: `${process.env.API_GATEWAY_PARSER_PROTOCOL}://${process.env.API_GATEWAY_PARSER_TARGET}`,
  },
  {
    route: process.env.API_GATEWAY_GOOGLE_MODULES_ROUTE,
    target: `${process.env.API_GATEWAY_GOOGLE_MODULES_PROTOCOL}://${process.env.API_GATEWAY_GOOGLE_MODULES_TARGET}`,
  },
];

services.forEach(({ route, target }) => {
  // Proxy options
  const proxyOptions = {
    target,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      [`^${route}`]: "",
    },
    onProxyReq: fixRequestBody,
  };

  app.use(route, createProxyMiddleware(proxyOptions));
});

// Handler for route-not-found
app.use((_req, res) => {
  res.status(404).json({
    code: 404,
    status: "Error",
    message: "Route not found.",
    data: null,
  });
});

const PORT = process.env.PORT || 5000;

httpsOptions = null;

if (process.env.SSL_ENABLED.toLocaleLowerCase() === "true") {
  httpsOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  };
}

if (httpsOptions != null) {
  const server = https.createServer(httpsOptions, app);

  server.listen(PORT, () => {
    console.log(`Api gateway listening on https with PORT ${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`Api gateway listening on http with PORT ${PORT}`);
  });
}
