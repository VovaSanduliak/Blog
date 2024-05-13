import ApiError from "../exceptions/api-error";
import IComment from "../types/interfaces/IComment";
import articleService from "./article-service";

const addComment = async (articleID: string, comment: IComment) => {
  try {
    const article = await articleService.getArticleById(articleID);

    if (!article) throw ApiError.BadRequest("Article not found");

    article.comments.push(comment);

    await article.save();
  } catch (err) {
    throw new Error(`Failed to add comment to article: ${err}`);
  }
};

export default {
  addComment;
}