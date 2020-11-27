import React from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { usePostsQuery } from "../generated/graphql";
import Layout from "../components/Layout";

const Index: React.FC = () => {
  const [{ data }] = usePostsQuery();

  return (
    <Layout>
      {data ? (
        data.posts.map((post) => {
          return <div key={post.id}>{post.title}</div>;
        })
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
