import ApiError from "../exceptions/api-error";
import articleModel from "../models/article-model";
import IArticle from "../types/interfaces/IArticle";

const getAllArticles = async () => {
  return await articleModel.find();
};

const getArticleById = async (id: string) => {
  const article = await articleModel.findById(id);
  if (!article) throw ApiError.BadRequest("Article not found");

  return article;
};

const createArticle = async (article: IArticle) => {
  return await articleModel.create(article);
};

const updateArticle = async (id: string, article: IArticle) => {
  const updatedArticle = await articleModel.findByIdAndUpdate(id, article, {
    new: true,
  });

  if (!updatedArticle) throw ApiError.BadRequest("Article not found");

  return updatedArticle;
};

const deleteArticle = async (id: string) => {
  const article = await articleModel.findByIdAndDelete(id);
  if (!article) throw ApiError.BadRequest("Article not found");

  return article;
};

export default {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
