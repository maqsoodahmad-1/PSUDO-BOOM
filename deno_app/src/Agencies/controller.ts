// deno-lint-ignore-file require-await


import { userToUserDto } from "./adapter.ts";
import type {
  RegisterPayload,
  AgencyController,
  Agency,
  AgencyRepository,
  LoginPayload,
  scheme,
  typeOfAgency
} from "./types.ts";
import { generateSalt ,hashWithSalt } from "./util.ts";
import { AuthRepository } from "../deps.ts"

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

  private async comparePassword (password: string, user:Agency) {
    const hashedPassword =  hashWithSalt (password, user.salt);

    if (hashedPassword === user.hash) {
      return Promise.resolve(true);
    }
    return Promise.reject(false);
  }
  
  private async getHashedAgency(name: string, password: string, email: string, Schemes:scheme, TypeOfAgency: typeOfAgency) {
    const salt = generateSalt();
    const user = {
      name,
      hash: hashWithSalt(password, salt),
      salt,
      email,
      Schemes,
      TypeOfAgency
      
    };

    return user;
  }

  public async register(payload: RegisterPayload) {
    if (await this.agencyRepository.exists(payload.name)) {
      return Promise.reject("Username already exists");
    }

    const createdUser = await this.agencyRepository.create(await this.getHashedAgency( payload.name, payload.password, payload.email, payload.Schemes, payload.TypeOfAgency));

    return userToUserDto(createdUser);
  }

  public async login ( payload: LoginPayload ) {
    try {
      const agencies = await 
      this.agencyRepository.getByUsername(payload.name);

      await this.comparePassword(payload.password, agencies);
 
      const token = await this.authRepository.generateToken(agencies.name); 
      return { agencies: userToUserDto(agencies), token };
    } catch (_e) {
      throw new Error ("Username and password combination is not correct");
    }
  }
}