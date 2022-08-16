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

    //check if agency exists
    async exists ( name: string ) {
        return Boolean(await this.storage.findOne({ name }))
    }
    // async exists(username: string) {
    //     return Boolean(this.storage.get(username));
    //   }
    
//Read the agency 
    async getByAgencyname (name: string) {
        const agency = await this.storage.findOne( { name } );
        if(!agency) {
            throw new Error ("Agency name not found ")
        } 
        return agency;
    }

//update the agency details
public async updatedAgency( name:string, newname:string ) {
    const isAgency = await this.exists(name);
    if( !isAgency ) {
        return new Error('Agency name not found');
    }
    try {
        await this.storage.updateOne({ name }, {$set:{ name: newname }})
        const updatedAgency = this.getByAgencyname(name);
        return updatedAgency;
    } catch(e) {
        return new Error("Updation Error");
    }
}

    async deleteAgency (name: string) {
       const deletedAgency = await this.storage.deleteOne({ name });
       return deletedAgency;
    }
}