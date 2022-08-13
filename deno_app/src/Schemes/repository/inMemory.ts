// deno-lint-ignore-file require-await
import { Schemes, SchemesRepository } from ".././index.ts";

export class Repository implements SchemesRepository {
    storage = new Map<string, Schemes> ();

    async getAll() {
        return[...this.storage.values()];
    }
}