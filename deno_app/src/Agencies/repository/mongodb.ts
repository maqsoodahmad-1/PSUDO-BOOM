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
    async create (agency: CreateAgency ) {
        const agencyWithCreatedAt = { ...agency, createdAt:new Date()}
        this.storage.insertOne({ ...agencyWithCreatedAt })
        return agencyWithCreatedAt;
    }

    async exists ( name: string ) {
        return Boolean(await this.storage.findOne({ name }))
    }
    // async exists(username: string) {
    //     return Boolean(this.storage.get(username));
    //   }
    

    async getByAgencyname (name: string) {
        const agency = await this.storage.findOne( { name } );
        if(!agency) {
            throw new Error ("User not found ")
        } 
        return agency;
    }

    async deleteAgency (name: string) {
       const deletedAgency = await this.storage.deleteOne({ name });
       return deletedAgency;
    }
}