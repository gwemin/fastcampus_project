var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const redis = require("redis");
const client = redis.createClient({ legacyMode: true });

(async () => {
  try {
    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();
  } catch (err) {
    console.error(err);
  }
})();
const axios = require("axios").default;

const redisSet = async (key, value) => {
  await client.setEx(key, 1440, JSON.stringify(value));
};

// express middleware
const redisGet = (req, res, next) => {
  const { id } = req.params;
  client.get(id, (err, data) => {
    if (err) res.send(err);
    if (data !== null) {
      res.send(data);
    } else {
      // Redis에 저장된게 없기 때문에 다음 로직 실행
      next();
    }
  });
};

app.get("/redis/:id", redisGet, async (req, res) => {
  // 미들웨어가 먼저 실행 ; redisGet
  const { id } = req.params;
  const { data } = await axios.request({
    methods: "get",
    url: `https://reqres.in/api/product/${id}`,
  });
  redisSet(id, data);
  res.send(data);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
