// import { Schemes } from "../meseums/index.ts";
import type { Agency, AgencyDto } from "./types.ts";

export const userToUserDto = ( user: Agency ): AgencyDto => {
    return {
        name: user.name,
        createdAt: user.createdAt,
        email:user.email,
        Schemes:{
            name:user.Schemes.name,
            link:user.Schemes.link,
            
        },
        TypeOfAgency: {
            Central:user.TypeOfAgency.Central,
            State: user.TypeOfAgency.State
        }
    }
}

