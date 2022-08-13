export type Schemes = {
    name: string,
    // title: string,
    category: string,
    isActive: boolean,
    typeOfBenifits: string,
    disabilityCriteria: number,
    description: string,
    startDate: Date,
    endDate: Date,
    DateOfBirth:Date,
    applicationLink:URL
    schemeType: {
        centeral:boolean,
        state: boolean
    },
    location: {
        lat: string,
        lng: string

    }
}

export interface SchemesController {
    getAll: () => Promise<Schemes[]>;
}

export interface SchemesRepository {
    getAll: () => Promise<Schemes[]>
}