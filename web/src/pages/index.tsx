import React, { useState } from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { usePostsQuery } from "../generated/graphql";
import Layout from "../components/Layout";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/core";

const Index: React.FC = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string
  });
  const [{ data, fetching }] = usePostsQuery({
    variables: variables
  });

  console.log(data);

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
          {data.posts.map((post) => {
            return (
              <Box key={post.id} p={5} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{post.title}</Heading>
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
      {data && (
        <Flex>
          <Button
            isLoading={fetching}
            m="auto"
            my={8}
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts[data.posts.length - 1].createdAt
              })
            }
          >
            Load More
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
