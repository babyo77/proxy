const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const PORT = process.env.PORT || 3000;
const app = express();
const UPLOAD_URL = process.env.UPLOAD_URL;
const UPLOAD_KEY = process.env.UPLOAD_KEY;

app.post(
  "/upload-image",
  createProxyMiddleware({
    target: UPLOAD_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/upload-image": "",
    },
    headers: {
      Authorization: UPLOAD_KEY,
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
