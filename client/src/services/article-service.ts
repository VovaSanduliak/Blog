import api from "../http";
import IArticle from "../models/IArticle";

const getAllArticles = async (): Promise<IArticle[]> => {
  try {
    const response = await api.get<IArticle[]>("/articles");
    return response.data;
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? `Failed to fetch articles: ${err.message}`
        : "Failed to fetch articles: Unknown error"
    );
  }
};

const createArticle = async (article: Partial<IArticle>): Promise<IArticle> => {
  try {
    const response = await api.post<IArticle>("/articles", article);
    return response.data;
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? `Failed to create article: ${err.message}`
        : "Failed to create article: Unknown error"
    );
  }
};

export default {
  getAllArticles,
  createArticle,
};
