const express = require("express");
const cors = require("cors");
const { article, user, company } = require("./router/index.js");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // req.body
app.use(express.urlencoded({ extended: true }));

// 기능별 라우터 추가
app.use(article);
app.use(user);
app.use(company);

// 서버 상태 확인용
app.get("/", (req, res) => {
  res.send("server is running!");
});

app.listen(PORT, "localhost", () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
