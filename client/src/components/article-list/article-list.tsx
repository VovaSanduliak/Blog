import { Grid } from "@mantine/core";
import ArticleItem from "../article-item/article-item";

const ArticleList: React.FC = () => {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <ArticleItem />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <ArticleItem />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <ArticleItem />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <ArticleItem />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <ArticleItem />
      </Grid.Col>
    </Grid>
  );
};

export default ArticleList;
