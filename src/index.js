const express = require("express");
const bodyParser = require("body-parser");
const { errorHandler } = require("./middlewares/errorHandler");
const { authJWT, adminOnly } = require("./middlewares/auth");
require("dotenv").config();

const mainRoute = "/api/v1/";
const posRoute = require("./routes/v1/posRoute");
const partRoute = require("./routes/v1/partRoute");
const userRoute = require("./routes/v1/userRoute");
const workOrderRoute = require("./routes/v1/workOrderRoute");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(`${mainRoute}part`, authJWT, adminOnly, partRoute);
app.use(`${mainRoute}pos`, authJWT, posRoute);
app.use(`${mainRoute}user`, userRoute);
app.use(`${mainRoute}work-order`, authJWT, workOrderRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

module.exports = app;
