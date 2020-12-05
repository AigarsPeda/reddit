import React from "react";
import { Flex, IconButton } from "@chakra-ui/core";
import { PostSnippetFragment } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: React.FC<UpdootSectionProps> = (props) => {
  const { post } = props;
  return (
    <Flex flexDirection="column" align="center" justifyContent="center" mr={4}>
      <IconButton
        icon="chevron-up"
        size="md"
        aria-label="up vote"
        background="none"
      />
      <p>{post.points}</p>
      <IconButton
        icon="chevron-down"
        size="md"
        aria-label="down vote"
        background="none"
      />
    </Flex>
  );
};

export default UpdootSection;
