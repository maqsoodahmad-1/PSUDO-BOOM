// import { Schemes } from "../meseums/index.ts";
import type { Agency, AgencyDto } from "./types.ts";

export const agencyToAgencyDto = ( agency: Agency ): AgencyDto => {
    return {
        name: agency.name,
        createdAt:agency.createdAt,
        email:agency.email,
        // Schemes:{
        //     name:agency.Schemes.name,
        //     link:agency.Schemes.link,
        
        // },
        // TypeOfAgency: {
        //     Central:agency.TypeOfAgency.Central,
        //     State: agency.TypeOfAgency.State
        
    // }
    schemesName:agency.schemesName,
    schemesLink:agency.schemesLink,
    TypeOfAgency:agency.TypeOfAgency

}

}