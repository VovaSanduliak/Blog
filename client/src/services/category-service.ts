import api from "../http";
import ICategory from "../models/ICategory";

const getAllCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await api.get<ICategory[]>("/categories");
    return response.data;
  } catch (err) {
    throw new Error(
      err instanceof Error
        ? `Failed to fetch articles: ${err.message}`
        : "Failed to fetch articles: Unknown error"
    );
  }
};

export default {
  getAllCategories,
};
