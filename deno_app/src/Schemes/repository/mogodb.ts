// deno-lint-ignore-file
//deno-lint-ignore-file require-await
import { Schemes } from "../types.ts";
import { Collection, Database } from "../../deps.ts";
import { SchemesRepository } from "../index.ts";

interface RepositoryDependencies {
  storage: Database;
}

export class Repository implements SchemesRepository {
  storage: Collection<Schemes>;
  constructor({ storage }: RepositoryDependencies) {
    this.storage = storage.collection<Schemes>("Schemes");
  }

  //Check if the schems already exists
  async exists (name:string) {
    return Boolean(await this.storage.findOne({ name }));
  }
  //retriving all the schemes from the database
  async getAll() {
    const all_Schemes = await this.storage.find().toArray();
    return all_Schemes;
  }

//creating a new scheme in the database
async createScheme (scheme: Schemes) {
    try{
        const createdScheme  = {...scheme}
        await this.storage.insertOne({ ...createdScheme });
        return createdScheme;
    } catch(e) {
         return new Error ("unable to create the scheme ")
    }
} 

}

// function getAll() {
// throw new Error("Function not implemented.");
// }
