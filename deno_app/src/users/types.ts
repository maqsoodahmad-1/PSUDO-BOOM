import { ObjectId } from "https://deno.land/x/web_bson@v0.2.4/mod.ts";

export type User = {
    username: string,
    email:string,
    contactNumber:number,
    hash: string,
    salt: string,
    createdAt: Date
}
export type CreateUser = 
    Pick<User, "username" | "hash" | "salt" | "email" | "contactNumber">;

//UserDto :User Data Transfer
export type UserDto = Pick<User, "createdAt" | "username" | "email" | "contactNumber" >

export interface UserRepository {
    create: (user: CreateUser ) => Promise<User>
    exists: (username: string) => Promise<boolean>
    getByUsername: (username: string) => Promise<User>
    deleteUser:(username:string) => Promise<number>
    getAll: () => Promise<UserDto[] | Error>
    updateUser:(usernmae:string, contactNumber:number) => Promise<User | Error>
}

export type RegisterPayload = { username: string; password: string, email:string ,contactNumber:number};

export type UpdatePayload = { username: string, contactNumber:number};

export type DeleteUser = { username:string };

export type LoginPayload = { username: string; password: string };

export interface UserController {
    register: (payload: RegisterPayload ) => Promise<UserDto>;
    login: ({ username, password }: LoginPayload) => Promise< { user: UserDto,token:string } >;
    deleteUser: (payload:DeleteUser) =>  Promise<number>;
    getAll:() => Promise<UserDto[] | Error>
    updatedUser:(payload:UpdatePayload) => Promise<User | Error>
}

// export type CreateUser = 
// Pick<User, "username" | "hash" | "salt">;



