const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const Article = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  board: { type: Schema.Types.ObjectId, ref: "Board", required: true },
  title: { type: String, required: true, unique: true },

  // 동적으로 변동 될 수 있는 데이터
  thumbupCount: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },

  // (옵션) : 사용자가 게시글에 추가할 수 있는 데이터
  articleImgAddress: { type: String },
  mention: { type: Schema.Types.ObjectId, ref: "User" },
});

Article.plugin(AutoIncrement, { inc_field: "id" });

module.exports = Article;
