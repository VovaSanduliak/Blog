import { Request, Response, NextFunction } from "express";
import articleService from "../services/article-service";

const getAllArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articles = await articleService.getAllArticles();
    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};

const getArticleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const article = await articleService.getArticleById(id);
    res.status(200).json(article);
  } catch (err) {
    next(err);
  }
};

const createArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const articleData = req.body;
    const newArticle = await articleService.createArticle(articleData);
    res.status(201).json(newArticle);
  } catch (err) {
    next(err);
  }
};

const updateArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const articleData = req.body;
    const updatedArticle = await articleService.updateArticle(id, articleData);
    res.status(200).json(updatedArticle);
  } catch (err) {
    next(err);
  }
};

const deleteArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedArticle = await articleService.deleteArticle(id);
    res.status(200).json(deletedArticle);
  } catch (err) {
    next(err);
  }
};

export default {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
