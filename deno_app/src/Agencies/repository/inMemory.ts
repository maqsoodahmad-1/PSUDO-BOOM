/*// deno-lint-ignore-file require-await
import { CreateUser , User, UserRepository } from "../types.ts";
import { generateSalt, hashWithSalt } from "../util.ts";

export class Repository implements UserRepository {
 private storage = new Map<User['username'], User>();
  async create(user: CreateUser) {
    const userWithCreatedAt = { ...user, createdAt:new Date() }
    this.storage.set(user.username, { ...userWithCreatedAt });
    return userWithCreatedAt;
    // const salt = generateSalt();
    // const user = {
    //   createdAt: new Date(),
    //   username,
    //   hash: hashWithSalt(password, salt),
    //   salt,
    }

    // this.storage.set(username, user);

    // return user;
  // }

  async exists(username: string) {
    return Boolean(this.storage.get(username));
  }

  async getByUsername(username:string) {
    const user = this.storage.get(username);
    if(!user) {
      throw new Error ("User not found");
    }
    return user;
  }
}*/