import {
  Alert,
  Button,
  Fieldset,
  Group,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useCreateArticle from "../../hooks/use-create-article";
import useAuth from "../../hooks/use-auth";

interface ArticleData {
  authorID: string;
  title: string;
  categoryID: string;
  content: string;
}

const CreateArticle: React.FC = () => {
  const { createArticle, loading, error, success } = useCreateArticle();
  const { user } = useAuth();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      categoryID: "",
      content: "",
    },
  });

  const handleSubmit = async (articleData: ArticleData) => {
    if (user) {
      articleData.authorID = user.id;
      console.log(articleData);
    } else {
      // TODO: unauthorized error
    }
    await createArticle(articleData);
  };

  return (
    <form
      onSubmit={form.onSubmit((articleData: ArticleData) =>
        handleSubmit(articleData)
      )}
    >
      <Fieldset legend="Create article">
        <TextInput
          label="Title"
          withAsterisk
          key={form.key("title")}
          {...form.getInputProps("title")}
        ></TextInput>
        <TextInput
          label="Category"
          withAsterisk
          key={form.key("categoryID")}
          {...form.getInputProps("categoryID")}
        ></TextInput>
        <Textarea
          label="Text"
          withAsterisk
          autosize
          key={form.key("content")}
          {...form.getInputProps("content")}
        />
      </Fieldset>
      {error && <Alert color="red">{error}</Alert>}
      {success && <Alert color="green">Article created successfully!</Alert>}
      <Group justify="flex-end" mt="md">
        <Button fullWidth type="submit">
          {loading ? "Creating..." : "Create"}
        </Button>
      </Group>
    </form>
  );
};
export default CreateArticle;
