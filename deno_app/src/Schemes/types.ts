export type Schemes = {
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
    link:URL,
  
}

export type createScheme = Pick<Schemes, 'name' | 'description' |"link">;

export interface SchemesRepository {
    getAll: () => Promise<Schemes[]>
    exists:(name:string) => Promise<boolean>
    // createScheme: (scheme:Schemes) => Promise<Schemes | Error>
    schemesFetching:(scheme:Schemes)=> Promise<Schemes>;
}

// e/xport Type ScehemPayload = {}




export interface SchemesController {
    getAll: () => Promise<Schemes[]>;
    // createdScheme:(payload:Schemes) => Promise<Schemes | Error>
    schemesFetching:(schemes:Schemes) => Promise<Schemes>
}
