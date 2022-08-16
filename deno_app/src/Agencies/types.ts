// export type scheme = {
//   name: string;
//   link: string;
// };

// export type typeOfAgency = {
//   Central: boolean;
//   State: boolean;
// };

export type Agency = {
  name: string,
  email: string,
  TypeOfAgency: string,
  schemesName:string,
  schemesLink:string,
  createdAt: Date;
};
export type CreateAgency = Pick< Agency, "name" |  "email" | "TypeOfAgency" | "schemesName" | "schemesLink">;

//UserDto : Agrncy Data Transfer
export type AgencyDto = Pick<Agency, "createdAt" | "name" | "email" | "TypeOfAgency" | "schemesName" | "schemesLink">;

export interface AgencyRepository {
  create: (user: CreateAgency) => Promise<Agency>;
  exists: (name: string) => Promise<boolean>;
  getByAgencyname: (name: string) => Promise<Agency>;
  deleteAgency: (name: string) => Promise<number>;
  updatedAgency: (name:string, newname: string) => Promise<Agency | Error>
}

export type RegisterPayload = {
  name: string;
  email: string;
  TypeOfAgency: string;
  schemesName:string ;
  schemesLink:string
};

// export type LoginPayload = { name: string; password: string };

export type DeletePayload = { name: string }

export type UpdatePayload = { name: string ,newname: string };

export interface AgencyController {
  register: (payload: RegisterPayload) => Promise<AgencyDto>;
  // login: ({ name, password }: LoginPayload,) => Promise<{ agencies: AgencyDto; token: string }>;
  deleteAgency:( payload:DeletePayload ) => Promise<number>
  updatedAgency:(payload:UpdatePayload) => Promise<Agency | Error >
}

// export type CreateUser =
// Pick<User, "username" | "hash" | "salt">;
