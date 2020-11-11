import { User } from "../entities/User";

import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from "type-graphql";
import { MyContext } from "../types";
import argon2 from "argon2";
import { COOKIE_NAME } from "../constants";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { validateRegister } from "../utils/validateRegister";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  // @Mutation(() => Boolean)
  // async forgotPassword(@Arg("email") email: string, @Ctx() ctx: MyContext) {
  //   const user = await ctx.em.findOne(User, { email: email });
  //   return true;
  // }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext) {
    // you ar not logged in
    if (!ctx.req.session.userId) {
      return null;
    }

    // if you have cookie saved in browser find user with tad id
    // setting cookie in login function and register function
    const user = await ctx.em.findOne(User, { id: ctx.req.session.userId });

    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options", () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() ctx: MyContext
  ): Promise<UserResponse> {
    // validating inputs
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    // creating and saving user to db
    const hashedPassword = await argon2.hash(options.password);
    const user = ctx.em.create(User, {
      username: options.username,
      email: options.email,
      password: hashedPassword
    });

    try {
      await ctx.em.persistAndFlush(user);
    } catch (error) {
      // duplicate username error
      if (error.code === "23505" || error.details.includes("already exists")) {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken"
            }
          ]
        };
      }
    }

    // store user id session
    // this will set cookie on the user
    // keep them logged in
    ctx.req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<UserResponse> {
    // login user to db
    const user = await ctx.em.findOne(
      User,
      usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail }
    );
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "username doesn't exists"
          }
        ]
      };
    }
    // get users password from db an compare it to entered password
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password"
          }
        ]
      };
    }

    // store user id session
    // this will set cookie on the user
    // keep them logged in
    ctx.req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() ctx: MyContext) {
    return new Promise((resolve) =>
      ctx.req.session.destroy((err) => {
        ctx.res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
