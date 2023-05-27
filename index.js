const express = require("express");
const bodyParser = require("body-parser");
const { errorHandler } = require("./src/middlewares/errorHandler");

const mainRoute = "/api/v1/";
const posRoute = require("./src/routes/v1/posRoute");
const partRoute = require("./src/routes/v1/partRoute");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(`${mainRoute}part`, partRoute);
app.use(`${mainRoute}pos`, posRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

module.exports = app;
