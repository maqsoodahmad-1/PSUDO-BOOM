import type { SchemesController,SchemesRepository } from "./index.ts";
import { Schemes } from "./types.ts";
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

    //Creating the Scheme in 

    private  getSchemes(
        name: string,
        description: string,
        isActive: boolean,
        category: string,
        typeOfBenifits: string,
        disabilityCriteria: number,
        startDate: Date,
        endDate: Date,
        schemeType: {
            centeral:boolean,
            state: boolean
        },
        location: {
            lat: string,
            lng: string
        },
        applicationLink:URL,
    ) {
        const schems = {
            name,
            description,
            isActive,
            category,
            typeOfBenifits,
            disabilityCriteria,
            startDate,
            endDate,
            schemeType,
            location,
            applicationLink,
        }
        return schems;
    }


    async createdScheme(payload:Schemes){
        if(await this.schemesRepository.exists(payload.name)) {
            return Promise.reject("Scheme with the same name already exists");
        }
    const createdScheme = await this.schemesRepository.createScheme( await this.getSchemes(
        payload.name, 
        payload.description,
        payload.isActive,
        payload.category,
        payload.typeOfBenifits,
        payload.disabilityCriteria,
        payload.startDate,
        payload.endDate,
        payload.schemeType,
        payload.location,
        payload.applicationLink
        ))
        return createdScheme;
    }
}