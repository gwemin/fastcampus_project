const { Article } = require("../mongoose/model");

// Create
const articleCreate = async (req, res) => {
  const { content } = req.body;
  const newArticle = await Article({ content });
  const saveRequest = await newArticle.save();
  console.log(`create article: ${saveRequest}`);
  res.send(saveRequest);
};

// Read
const articleRead = async (req, res) => {
  const articles = await Article.find({});
  res.send(articles);
};
const articleFindOne = async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  res.send(article);
};
// Update
const articleUpdate = async (req, res) => {
  const { id, content } = req.body;
  const updatedArticle = await Article.findByIdAndUpdate(id, { content });
  res.send(updatedArticle);
};

// Delete
const articleDelete = async (req, res) => {
  const { id } = req.params;
  const deleteArticle = await Article.findByIdAndDelete(id);
  res.send(deleteArticle);
};

module.exports = {
  articleCreate,
  articleRead,
  articleFindOne,
  articleUpdate,
  articleDelete,
};
