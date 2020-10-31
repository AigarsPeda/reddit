import "reflect-metadata";
import microConfig from "./mikro-orm.config";
import express from "express";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const PORT = 8000;

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false
    }),
    context: () => ({ em: orm.em })
  });

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
};

main();
