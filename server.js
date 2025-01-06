const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const { default: rateLimit } = require("express-rate-limit");
const app = express();
const UPLOAD_URL = process.env.UPLOAD_URL;
const UPLOAD_KEY = process.env.UPLOAD_KEY;
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
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
