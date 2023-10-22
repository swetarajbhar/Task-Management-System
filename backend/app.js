const express = require("express");
const timeout = require("connect-timeout");
const cors = require("cors");
var bodyParser = require("body-parser");

const authRoute = require("./apis/src/v1/routes/auth/index");

const { bootstrap: initializeMongo } = require("./config/components/mongo");

const app = express();

// disable default headers as per Infosec Guidelines
app.disable("x-powered-by");
app.set("etag", false);

app.use(express.text());
app.use(express.json());

// timeout middleware
app.use(timeout("1200s"));
app.use(cors());

initializeMongo();

// custom routes for business logic to be placed below.
app.use("/auth", authRoute);
// app.use("/api/v1/schedule/", scheduleRoutes);
// app.use("/api/v1/transcribe/", transcribeRoute);
// app.use("/api/v1/user/", userRoute);
// app.use("/api/v1/language/", languageRoute);
// app.use("/api/v1/translate/", translateRoute);

// middleware to check timeout
app.use(haltOnTimedout);

// healthcheck endpoint for load balancer
app.get("/healthcheck", (req, res) => {
  res.status(200).send("success");
});
function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

// error handler
process.on("uncaughtException", (err) => {
  console.error("uncaughtException", err);
});

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection", err);
});

module.exports = { app };
