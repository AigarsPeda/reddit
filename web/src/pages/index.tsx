import React, { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { usePostsQuery } from "../generated/graphql";
import Layout from "../components/Layout";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/core";

const Index: React.FC = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string
  });
  const [{ data, fetching }] = usePostsQuery({
    variables
  });

  // console.log(variables);

  if (!fetching && !data) {
    return (
      <div>
        <h1>You got no posts for some reason!</h1>
      </div>
    );
  }

  return (
    <Layout>
      {data && !fetching ? (
        <Stack spacing={8}>
          {data.posts.posts.map((post) => {
            return (
              <Box key={post.id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{post.title}</Heading>
                <Text>Author: {post.creator.username}</Text>
                <Text mt={4}>{post.textSnippet}...</Text>
              </Box>
            );
          })}
        </Stack>
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            isLoading={fetching}
            m="auto"
            my={8}
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt
              })
            }
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
