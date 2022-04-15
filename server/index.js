const express = require("express");
const cors = require("cors");
const { article, board, comment, company, reply, user } = require("./router/index.js");
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json()); // req.body
app.use(express.urlencoded({ extended: true }));

// 기능별 라우터 추가
app.use(article);
app.use(board);
app.use(comment);
app.use(company);
app.use(reply);
app.use(user);

// 서버 상태 확인용
app.get("/", (req, res) => {
  res.send("server is running!");
});

app.listen(PORT, "localhost", () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
