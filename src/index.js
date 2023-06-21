const express = require("express");
const bodyParser = require("body-parser");
const { errorHandler } = require("./middlewares/errorHandler");
const { auth } = require("./middlewares/auth");
const mainRoute = "/api/v1/";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(`${mainRoute}part`, auth, require("./routes/v1/partRoute"));
app.use(`${mainRoute}pos`, auth, require("./routes/v1/posRoute"));
app.use(`${mainRoute}user`, require("./routes/v1/userRoute"));
app.use(`${mainRoute}work-order`, auth, require("./routes/v1/workOrderRoute"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

module.exports = app;
