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
    applicationLink:URL
    schemeType: {
        centeral:boolean,
        state: boolean
    },
  
}


export interface SchemesRepository {
    getAll: () => Promise<Schemes[]>
    exists:(name:string) => Promise<boolean>
    createScheme: (scheme:Schemes) => Promise<Schemes | Error>

}

// e/xport Type ScehemPayload = {}




export interface SchemesController {
    getAll: () => Promise<Schemes[]>;
    createdScheme:(payload:Schemes) => Promise<Schemes | Error>
}
