import React from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { usePostsQuery } from "../generated/graphql";

const Index: React.FC = () => {
  const [{ data }] = usePostsQuery();

  return (
    <div>
      {data ? (
        data.posts.map((post) => {
          return <div key={post.id}>{post.title}</div>;
        })
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
