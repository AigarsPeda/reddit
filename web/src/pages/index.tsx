import React from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { usePostsQuery } from "../generated/graphql";
import Layout from "../components/Layout";
import { Box, Heading, Stack, Text } from "@chakra-ui/core";

const Index: React.FC = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10
    }
  });

  return (
    <Layout>
      {data ? (
        <Stack spacing={8}>
          {data.posts.map((post) => {
            return (
              <Box key={post.id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{post.title}</Heading>
                <Text mt={4}>{post.textSnippet}</Text>
              </Box>
            );
          })}
        </Stack>
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
