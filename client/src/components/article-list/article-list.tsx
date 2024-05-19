import { Alert, Center, Grid, Loader } from "@mantine/core";
import ArticleItem from "../article/article-item";
import useArticles from "../../hooks/use-articles";

const ArticleList: React.FC = () => {
  const { articles, loading, error } = useArticles();

  if (loading) {
    return (
      <Center>
        <Loader size="xl" />
      </Center>
    );
    // TODO: Loader component
    // return <Loader />;
  }

  if (error) {
    return <Alert color="red">{error}</Alert>;
  }

  if (!articles.length) {
    return <div>No articles</div>;
  }

  return (
    <Grid>
      {articles.map((article) => (
        <Grid.Col key={article.title} span={{ base: 12, md: 6, lg: 3 }}>
          <ArticleItem article={article} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default ArticleList;
