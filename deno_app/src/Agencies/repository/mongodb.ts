import { Agency, CreateAgency, AgencyRepository } from "../types.ts";
import { Database, Collection } from '../../deps.ts' 

interface RepositoryDependencies {
    storage: Database,
}

export class Repository implements AgencyRepository {
    storage: Collection<Agency>
    constructor({ storage }: RepositoryDependencies) {
        this.storage = storage.collection<Agency>('Agencies');
    }

    // deno-lint-ignore require-await
    async create (user: CreateAgency ) {
        const userWithCreatedAt = { ...user, createdAt:new Date()}
        this.storage.insertOne({ ...userWithCreatedAt })
        return userWithCreatedAt;
    }

    async exists ( name: string ) {
        return Boolean(await this.storage.count({ name }))
    }
    // async exists(username: string) {
    //     return Boolean(this.storage.get(username));
    //   }
    

    async getByUsername (name: string) {
        const agency = await this.storage.findOne( { name } );
        if(!agency) {
            throw new Error ("User not found ")
        } 
        return agency;
    }
}