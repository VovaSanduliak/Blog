import ApiError from "../exceptions/api-error";
import categoryModel from "../models/category-model";
import ICategory from "../types/interfaces/ICategory";

const getAllCategories = async () => {
  return await categoryModel.find();
};

const getCategoryById = async (id: string) => {
  const category = await categoryModel.findById(id);
  if (!category) throw ApiError.BadRequest("Category not found");

  return category;
};

const createCategory = async (category: ICategory) => {
  return await categoryModel.create(category);
};

const updateCategory = async (id: string, category: ICategory) => {
  const updatedCategory = await categoryModel.findByIdAndUpdate(id, category, {
    new: true,
  });

  if (!updatedCategory) throw ApiError.BadRequest("Category not found");

  return updatedCategory;
};

const deleteCategory = async (id: string) => {
  const category = await categoryModel.findByIdAndDelete(id);
  if (!category) throw ApiError.BadRequest("Category not found");

  return category;
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
