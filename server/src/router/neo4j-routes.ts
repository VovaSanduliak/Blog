import express, { Request, Response, NextFunction } from "express";
import {} from "../../services/user-service";
import neo4jService from "../../services/neo4j-service";

const router = express.Router();

router.post(
  "/add-user",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, email } = req.body;
    try {
      const savedUser = await neo4jService.addUserToNeo4j(id, email);
      res.status(201).json(savedUser);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/subscribe",
  async (req: Request, res: Response, next: NextFunction) => {
    const { followerId, followeeId } = req.body;
    try {
      const result = await neo4jService.addSubscription(followerId, followeeId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/unsubscribe",
  async (req: Request, res: Response, next: NextFunction) => {
    const { followerId, followeeId } = req.body;
    try {
      const result = await neo4jService.removeSubscription(
        followerId,
        followeeId
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/subscribed-articles/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    try {
      const articles = await neo4jService.getSubscribedArticles(
        userId as string
      );
      res.status(200).json(articles);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/author-articles/:authorId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { authorId } = req.params;
    try {
      const articles = await neo4jService.getAuthorArticles(authorId as string);
      res.status(200).json(articles);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/add-article",
  async (req: Request, res: Response, next: NextFunction) => {
    const { articleId, title, content, authorId } = req.body;
    try {
      const newArticle = await neo4jService.addArticleToNeo4j(
        articleId,
        title,
        content,
        authorId
      );
      res.status(201).json(newArticle);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/add-saved-article",
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, articleId } = req.body;
    try {
      const result = await neo4jService.addSavedArticleToNeo4j(
        userId,
        articleId
      );
      res.status(200).json({ message: "Article saved successfully" });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
