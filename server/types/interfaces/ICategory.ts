import mongoose from "mongoose";

interface ICategory {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  description?: string;
}

export default ICategory;
