interface IArticle {
  id: string;
  authorID: string;
  categoryID: string;
  title: string;
  content: string;
  comments?: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

export default IArticle;
