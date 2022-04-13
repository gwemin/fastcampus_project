const express = require("express");
const router = express.Router();
const { User } = require("../mongoose/model");

// 로그인 요청
router.post("/user", async (req, res) => {
  const { email, password } = req.body;
  const loginUser = await User.find({ email: email });
  if (!loginUser._id) {
    return res.send({
      error: true,
      msg: "존재하지 않는 이메일",
    });
  }

  const correctPassword = await User.authenticate(password);
  if (!correctPassword) {
    return res.send({
      error: true,
      msg: "비밀번호 불일치",
    });
  }

  res.send({ email: loginUser.email, nickname: loginUser.nickname });
});

// 사용자 추가
router.post("/user/create", async (req, res) => {
  const { nickname, company, email, password } = req.body;
  const newUser = await User({
    email,
    nickname,
    password,
    company,
  }).save();
  console.log(newUser);
  res.send(true);
});

module.exports = router;
