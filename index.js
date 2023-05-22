const express = require("express");
const bodyParser = require("body-parser");
const { errorHandler } = require("./src/middlewares/errorHandler");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

const mainRoute = "/api/v1/";
app.use(`${mainRoute}part`, require("./src/routes/v1/partRoute"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
