const express = require("express");
const { Article } = require("./api");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

// req.body - post에서 들어온 페이로드를 받을수 있다.
// body-parser 역할
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Success");
});

app.post("/create", Article.articleCreate);
app.get("/read", Article.articleRead);
app.patch("/update", Article.articleUpdate);
app.delete("/delete/:id", Article.articleDelete);

app.listen(3000, "localhost", () => {
  console.log(`App listening at http:localhost:${port}`);
});
