import { useState } from "react";
import articleService from "../services/article-service";
import IArticle from "../models/IArticle";

const useCreateArticle = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const createArticle = async (article: Partial<IArticle>) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await articleService.createArticle(article);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { createArticle, loading, error, success };
};

export default useCreateArticle;
