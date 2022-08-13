import { User, CreateUser, UserRepository } from "../types.ts";
import { Database, Collection } from '../../deps.ts' 

interface RepositoryDependencies {
    storage: Database,
}

export class Repository implements UserRepository {
    storage: Collection<User>
    constructor({ storage }: RepositoryDependencies) {
        this.storage = storage.collection<User>('users');
    }

    // deno-lint-ignore require-await
    async create (user: CreateUser ) {
        const userWithCreatedAt = { ...user, createdAt:new Date()}
        this.storage.insertOne({ ...userWithCreatedAt })
        return userWithCreatedAt;
    }

    async exists ( username: string ) {
        return Boolean(await this.storage.count({ username }))
    }
    // async exists(username: string) {
    //     return Boolean(this.storage.get(username));
    //   }
    

    async getByUsername (username: string) {
        const user = await this.storage.findOne( { username } );
        if(!user) {
            throw new Error ("User not found ")
        } 
        return user;
    }
}