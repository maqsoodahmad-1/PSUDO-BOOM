export type scheme = {
    name:string,
    link:string,
}

export type typeOfAgency = {
    Central:boolean,
    State: boolean
}

export type Agency = {
    name: string,
    email:string,
    Schemes:scheme,
    TypeOfAgency:typeOfAgency,
    hash: string,
    salt: string,
    createdAt: Date
}
export type CreateAgency = 
    Pick<Agency, "name" | "hash" | "salt" | "email" | "TypeOfAgency" | "Schemes" >;

//UserDto : Agrncy Data Transfer
export type AgencyDto = Pick<Agency, "createdAt" | "name" | "email" | "TypeOfAgency" | "Schemes" >

export interface AgencyRepository {
    create: (user: CreateAgency ) => Promise<Agency>
    exists: (name: string) => Promise<boolean>
    getByUsername: (name: string) => Promise<Agency>
    
}

 export type RegisterPayload = { name: string, password: string, email:string ,TypeOfAgency:typeOfAgency, Schemes: scheme }

export type LoginPayload = { name: string, password: string };

export interface AgencyController {
    register: (payload: RegisterPayload ) => Promise<AgencyDto>;
    login: ({ name, password }: LoginPayload) => Promise< { agencies: AgencyDto,token:string } >;

}

// export type CreateUser = 
// Pick<User, "username" | "hash" | "salt">;

