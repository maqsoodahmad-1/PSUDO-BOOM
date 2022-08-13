import { createServer } from "./web/index.ts";
import { MongoClient } from "./deps.ts";
import {
  Controller as SchemesController,
  Repository as SchemesRepository,
} from "./Schemes/index.ts";

import {
  Controller as UserController,
  Repository as UserRepository,
} from "./users/index.ts";

import {
  Controller as AgencyController,
  Repository as AgencyRepository
} from "./Agencies/index.ts" 

import { AuthRepository, Algorithm } from "./deps.ts";

const authConfiguration = { 
  algorithm: "HS512" as Algorithm,
  key: "my-secure-key",
  tokenExpirationInSeconds:120
}

//connecting with the uri(connection string)
const client = new MongoClient();
await client.connect("mongodb://127.0.0.1:27017")
const db = client.database("user");
// const dbSchemes = client.database('schemes')

const authRepository = new AuthRepository({
  configuration: authConfiguration
});

const schemesRepository = new SchemesRepository({storage:db});
const schemesController = new SchemesController({ schemesRepository });

const userRepository = new UserRepository({storage:db});
const userController = new UserController({ userRepository,authRepository });

const agenciesRepository = new AgencyRepository({storage:db});
const agenciesController = new AgencyController({agenciesRepository,authRepository})

schemesRepository.storage.insertOne( {
  name: "Enforcement Education",
  category:"deaf pwd candidates ",
  isActive:true,
  typeOfBenifits:"This scheme will enable user to get aware of the the things and will benifit him/her to get job ready",
  disabilityCriteria:40,
  description:
    "This scheme focuses on the enforecement of education among the pwd cadidate having the age below 30",
  startDate:new Date('2022-12-13'),
  endDate: new Date('2023-19-19'),
  DateOfBirth: new Date('2002-09-09'),
  applicationLink:new URL("https://google.com"),
  schemeType: {
    centeral:false,
    state:true
  },
  location: {
    lat: "48.860294",
    lng: "2.33862",
  },
});

createServer({
  configuration: {
    port: 8001,
    authorization:{
      key: authConfiguration.key,
      algorithm: authConfiguration.algorithm
    },
    allowedOrigin: ['http://localhost:3000'],
    // secure:true,
    // certFile: "./certificate.pem",
    // keyFile: "./key.pem'"
  },
  schemes: schemesController,
  user: userController,
  agencies:agenciesController
});
export {db}
// console.log(await museumController.getAll())
