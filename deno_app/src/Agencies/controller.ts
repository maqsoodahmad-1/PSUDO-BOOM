// deno-lint-ignore-file require-await


import { agencyToAgencyDto } from "./adapter.ts";
import type {
  RegisterPayload,
  AgencyController,
  Agency,
  AgencyRepository,
  // LoginPayload,
  // scheme,
  // typeOfAgency,
DeletePayload,
UpdatePayload
} from "./types.ts";
import { generateSalt ,hashWithSalt } from "./util.ts";
import { AuthRepository } from "../deps.ts"
import { stringify } from "https://deno.land/x/web_bson@v0.2.4/src/extended_json.ts";

interface ControllerDependencies {
  agenciesRepository: AgencyRepository;
  authRepository: AuthRepository
}

export class Controller implements AgencyController {
  agencyRepository: AgencyRepository;
  authRepository: AuthRepository;

  constructor({ agenciesRepository,authRepository }: ControllerDependencies) {
    this.agencyRepository = agenciesRepository;
    this.authRepository = authRepository;
  }

  // private async comparePassword (password: string, user:Agency) {
  //   const hashedPassword =  hashWithSalt (password, user.salt);

  //   if (hashedPassword === user.hash) {
  //     return Promise.resolve(true);
  //   }
  //   return Promise.reject(false);
  // }
  
  private async getHashedAgency(name: string,  email: string, schemesName:string, schemesLink:string,TypeOfAgency:string) {
    // const salt = generateSalt();
    const user = {
      name,
      // hash: hashWithSalt(password, salt),
      // salt,
      email,
      schemesName,
      schemesLink,
      TypeOfAgency
      
    };

    return user;
  }

  //Registering the user 
  public async register(payload: RegisterPayload) {
    if (await this.agencyRepository.exists(payload.name)) {
      return Promise.reject("Username already exists");
    }

    const createdAgency = await this.agencyRepository.create(await this.getHashedAgency( payload.name, payload.email, payload.schemesName, payload.schemesLink, payload.TypeOfAgency));

    return agencyToAgencyDto(createdAgency);
  } 

 //Loging in the user 
  // public async login ( payload: LoginPayload ) {
  //   try {
  //     const agencies = await 
  //     this.agencyRepository.getByAgencyname(payload.name);

  //     await this.comparePassword(payload.password, agencies);
 
  //     const token = await this.authRepository.generateToken(agencies.name); 
  //     return { agencies: agencyToAgencyDto(agencies), token };
  //   } catch (_e) {
  //     throw new Error ("Username and password combination is not correct");
  //   }
  // }

  //update Agency
  public async updatedAgency (payload: UpdatePayload) {
    const agencyUpdated =await this.agencyRepository.updatedAgency(payload.name,payload.newname);
    return agencyUpdated;
  }
  
  //Deleting the Agency from databse fumction
  public async deleteAgency (payload: DeletePayload)  {
      if(await this.agencyRepository.exists(payload.name)) {
        return await this.agencyRepository.deleteAgency(payload.name)
      }
      return Promise.reject("name can't be found ")
    
  }

}