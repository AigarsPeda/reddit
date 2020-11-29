import { getConnection } from "typeorm";
import { isAuth } from "./../middleware/isAuth";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "../types";

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@Resolver()
export class PostResolver {
  // if cursor not pasted in grab new posts depending on limit
  // after that from lest post in that list take createdAt
  // past in to query and get older posts how many depends on
  // limit witch is pasted in
  @Query(() => [Post])
  async posts(
    @Arg("limit") limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<Post[]> {
    const realLimit = Math.min(50, limit);
    const qb = getConnection()
      .getRepository(Post)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(realLimit);

    // adding property if there are pasted in cursor
    if (cursor) {
      qb.where('"createdAt" < :cursor', { cursor: new Date(parseInt(cursor)) });
    }

    return qb.getMany();
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id") id: number): Promise<Post | undefined> {
    // find and return one post
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  // if not log in don't allow to post a post
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    // replaced with line 40
    // if not log in don't allow to post a post
    // if (!req.session.userId) {
    //   throw new Error("not authenticated");
    // }

    // create and return post
    return Post.create({
      ...input,
      // adding post creators id to post table
      // when creating post
      creatorId: req.session.userId
    }).save();
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String) title: string
  ): Promise<Post | null> {
    // find and update a post
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      await Post.update({ id }, { title });
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id", () => Int) id: number): Promise<boolean> {
    // find and delete a post
    await Post.delete(id);

    return true;
  }
}
