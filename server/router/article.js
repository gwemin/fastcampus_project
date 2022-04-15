const express = require("express");
const router = express.Router();
const { Article, Comment } = require("../mongoose/model");

// 개별 게시글 가져오는 라우트
router.get("/article/:id", async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  const comment = await Comment.find({ article: id });
  res.send(article, comment);
});

// 게시글 추가
router.post("/article/create", async (req, res) => {
  const { title, content, board, author } = req.body;
  const newArticle = await Article({ author, title, content, board }).save();
  res.send(newArticle);
});

// 게시글 수정
router.patch("/article/update", async (req, res) => {
  const { id, author, content } = req.body;
  const updateArticle = await Article.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    {
      content,
    },
    {
      new: true,
    }
  );
  console.log(updateArticle);
  res.send(updateArticle);
});

// 게시글 완전 삭제(HARD DELETE)
router.delete("/article/delete/hard", async (req, res) => {
  const { id, author } = req.body;
  const deletedArticle = await Article.deleteOne({
    _id: id,
    author,
  });
  res.send(deletedArticle);
});
// 게시글 소프트 삭제(SOFT DELETE)
router.delete("/article/delete/soft", async (req, res) => {
  const { id, author } = req.body;
  const deletedArticle = await Article.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    {
      deleteTime: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30일 후의 시간이 저장
    }
  );
  res.send(deletedArticle);
});

module.exports = router;
