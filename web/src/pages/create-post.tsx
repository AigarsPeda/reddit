import React from "react";
import Layout from "../components/Layout";
import InputField from "../components/InputField";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Box, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { useCreatePostMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { useIsAuth } from "../utils/hooks/useIsAuth";

const CreatePost: React.FC = () => {
  const router = useRouter();

  useIsAuth();

  const [, createPost] = useCreatePostMutation();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          // error is handled in createUrqlClient in errorExchange
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="title"
              label="Title"
              autoComplete="on"
            />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Text"
                type="text"
                autoComplete="off"
              />
            </Box>
            <Box textAlign="right">
              <Button
                type="submit"
                // variantColor="blue"
                bg="#2D3748"
                color="#F7FAFC"
                mt={4}
                isLoading={isSubmitting}
              >
                Create Post
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
