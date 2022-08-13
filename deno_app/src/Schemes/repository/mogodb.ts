// deno-lint-ignore-file
//deno-lint-ignore-file require-await
import { Schemes } from "../types.ts";
import { Database, Collection } from "../../deps.ts"
import { SchemesRepository } from "../index.ts";

interface RepositoryDependencies {
    storage:Database,
}

export class Repository implements SchemesRepository {
    storage : Collection<Schemes>
    constructor({ storage }: RepositoryDependencies ) {
        this.storage = storage.collection<Schemes>('Museums');
    }
            async getAll() {
                const all_Schemes = await this.storage.find().toArray();
                return all_Schemes
            }
    
}

// function getAll() {
// throw new Error("Function not implemented.");
// }
