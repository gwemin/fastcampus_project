const express = require("express");

const app = express();

const port = 3000;

// req.body - post에서 들어온 페이로드를 받을수 있다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Success");
});

app.listen(3000, "localhost", () => {
  console.log(`App listening at http:localhost:${port}`);
});
