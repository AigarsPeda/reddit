import React, { useState } from "react";
import { Flex, IconButton } from "@chakra-ui/core";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: React.FC<UpdootSectionProps> = (props) => {
  const { post } = props;
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  return (
    <Flex flexDirection="column" align="center" justifyContent="center" mr={4}>
      <IconButton
        onClick={async () => {
          setLoadingState("updoot-loading");
          await vote({
            postId: post.id,
            value: 1
          });
          setLoadingState("not-loading");
        }}
        variantColor={post.voteStatus === 1 ? "green" : undefined}
        isLoading={loadingState === "updoot-loading"}
        icon="chevron-up"
        size="md"
        aria-label="up vote"
      />
      <p>{post.points}</p>
      <IconButton
        onClick={async () => {
          setLoadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1
          });
          setLoadingState("not-loading");
        }}
        variantColor={post.voteStatus === -1 ? "red" : undefined}
        isLoading={loadingState === "downdoot-loading"}
        icon="chevron-down"
        size="md"
        aria-label="down vote"
      />
    </Flex>
  );
};

export default UpdootSection;
