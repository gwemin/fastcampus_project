const express = require("express");
const router = express.Router();
const { Comment } = require("../mongoose/model");

// 댓글 생성하기
router.post("/comment/create", async (req, res) => {
  const { author, article, content } = req.body;
  const newComment = await Comment({ author, article, content }).save();
  res.send(newComment._id ? true : false);
});

// 댓글 수정하기
router.patch("/comment/update", async (req, res) => {
  const { id, author, content } = req.body;
  const updateComment = await Comment.findOneAndUpdate(
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
  console.log(updateComment);
  res.send(updateComment);
});

// 댓글 완전 삭제(HARD DELETE)
router.delete("/comment/delete/hard", async (req, res) => {
  const { id, author } = req.body;
  const deletedComment = await Comment.deleteOne({
    _id: id,
    author,
  });
  res.send(deletedComment);
});
// 댓글 소프트 삭제(SOFT DELETE)
router.delete("/comment/delete/soft", async (req, res) => {
  const { id, author } = req.body;
  const deletedComment = await Comment.findOneAndUpdate(
    {
      _id: id,
      author,
    },
    {
      deleteTime: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30일 후의 시간이 저장
    }
  );
  res.send(deletedComment);
});

module.exports = router;
