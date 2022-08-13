import type { SchemesController,SchemesRepository } from "./index.ts";
 interface ControllerDependencies {

    schemesRepository: SchemesRepository
 
 }
export class Controller implements SchemesController {

    schemesRepository: SchemesRepository

    constructor ({ schemesRepository }:
    ControllerDependencies) {
        this.schemesRepository = schemesRepository
}
    // deno-lint-ignore require-await
    async getAll() {
        return this.schemesRepository.getAll();
    }
}