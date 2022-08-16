import { SchemesController } from "../Schemes/index.ts";
import { Algorithm, Application, Router, oakCors, jwtMiddleware, helpers } from "../deps.ts";
import { UserController } from "../users/index.ts";
import { AgencyController } from "../Agencies/index.ts";
import { _format } from "https://deno.land/std@0.140.0/path/_util.ts";
import type { Schemes } from "../Schemes/types.ts"

 //defining the interface for server 
interface CreateServerDependencies {
  configuration: {
    port: number;
    authorization: {
      key: string,
      algorithm:Algorithm
    },
  //  allowedOrigin: string[],
    // secure:boolean,
    // keyFile:string,
    // certFile:string
  },
  schemes: SchemesController;
  user: UserController;
  agencies:AgencyController
}
//Our interface enda here

// const addTestHeaderMiddleware: RouterMiddleware = async (ctx, next) => {
//   ctx.response.headers.set("X-Test", "true");
//   await next();
// };

//server function of type having the interface of type createServerDependencies
export async function createServer({
  configuration: {
    port,
    authorization,
    //allowedOrigin,
    // secure,
    // keyFile,
    // certFile
  },
  schemes,
  user,
  agencies,
}: CreateServerDependencies) {

  //Defining the application in the oak         // Schemes,
        // TypeOfAgency,
  const app = new Application();

  //deifning the authentication 
  const authenticated = jwtMiddleware(authorization);

  //calculating the response time 
    app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  });

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  });

//Adding the oak listen event listener this will be printed on the console
  app.addEventListener("listen", (e) => {
    console.log(
      `Application running at   http://${e.hostname || "loaclhost"}:${port}`,
    );
  });

  //adding the error event listener of oak library this will handle the bad conditions  
  app.addEventListener("error", (e) => {
    console.log("An error occured", e.message);
  });

 //using the cors
//  app.use(
//   oakCors({ origin: allowedOrigin })
//  );

 //definig the oak Router with prefix api
  const apiRouter = new Router({ prefix: "/api" });

  //this message will be printed whenever the api router will bw called 
  apiRouter.use(async (_, next) => {
    console.log("Request was made to the API ROUTER");
    await next();
  });

  
  //Api for registering the user in the database
  apiRouter.post("/users/register", async (ctx) => {

    //taking values from the vosy into the following variables
    const { username,password,email,contactNumber } = await ctx.request.body({ type: "json" })
    .value;
    
    //checking if all the inputs are given by the user and returning if the condition is true
    if (!username || !password || !email || !contactNumber) {
      ctx.response.body = { message:"all the inputs are required" };
      ctx.response.status = 401;

      return;
    }
    
    //trying to create the user by calling the register function
    try {
      const createdUser = await user.register({
        username,
        password,
        email,
        contactNumber,
      });
     
      //if user is created then sending the status code and the createdUser 
         ctx.response.status = 201;
         ctx.response.body = { user: createdUser };

    } catch (e) { //handling the errors if any 
      ctx.response.status = 400;
      ctx.response.body = { message: "user already exists with same name " };
    }
  });

  //login route for users
  apiRouter.post("/users/login", async (ctx) => {
    //taking username and password from the body and trying to login by calling the login method defined in controllers 
    const { username, password } = await ctx.request.body().value;
    try {
      const { user: loginUser, token } = await user.login({
        username,
        password
      });
      //sending user with token 
      ctx.response.body = { user: loginUser, token };
      ctx.response.status = 201;
    } catch (e) {
      ctx.response.body = { message: e.message };
      ctx.response.status = 400;
    }
  });
  
  //get the list of all the users 
  apiRouter.get("/users", async (ctx)=> {
    ctx.response.body = { users: await user.getAll()}
  })

  //PUT (UPDATE) operation on the user 
  apiRouter.put("/users/update/:username",async (ctx) => {
  const { username } = helpers.getQuery(ctx, {mergeParams: true });
  const { contactNumber } = await ctx.request.body({type:"json"}).value;
  try {
    ctx.response.body = {updatedUser:await user.updatedUser({username,contactNumber})}
    ctx.response.status = 201;
  } catch(e) {
    ctx.response.body = {message:e.message}
    ctx.response.status= 400;
  }
  })

  //Api for deleting the user form the database
    apiRouter.delete("/users/delete/:username", async (ctx) => {
      // const { username } = await ctx.request.body({ type: "json" }).value;
      const { username } = helpers.getQuery(ctx, { mergeParams: true });
      // const username = ctx.params.username;
      try {
        const deletedUser = await user.deleteUser( {username} )
        ctx.response.status = 201;
        ctx.response.body = { user:deletedUser };
      } catch(e) {
        ctx.response.status = 400;
        ctx.response.body = {message: e.message}
      }
    })
    apiRouter.get("/schemes", async (ctx) => {
      ctx.response.body = {
        museums: await schemes.getAll(),
      };
    });

  //Register route for Agencies
  apiRouter.post('/agencies/register', async (ctx) => {
    const { name, email, schemesName, schemesLink, TypeOfAgency } = await ctx.request.body({type:"json"}).value;
    //check if all the inputs were given
    if( !name || !email || ! schemesName || schemesLink || TypeOfAgency ) {
      ctx.response.status = 400;
      return;
    }

    try {
      const CreatedAgency = await agencies.register({
        name,
        email,
        schemesName,
        schemesLink,
        TypeOfAgency,
      });
      ctx.response.status = 201;
      ctx.response.body = { agencies:CreatedAgency }
    } catch(e) {
      ctx.response.status = 400;
      ctx.response.body = { message:e.message }
    }
  })
  
  // //login route for agencies
  // apiRouter.post('/agencies/login', async (ctx) => {
  //   const { name, password } = await ctx.request.body({type:"json"}).value;
  //   try {
  //     const { agencies: loginAgency, token } = await agencies.login({
  //       name,
  //       password,
  //     });
      
  //     ctx.response.body = { agencies: loginAgency, token };
  //     ctx.response.status = 201;
  //   } catch (e) {
  //     ctx.response.body = { message: e.message };
  //     ctx.response.status = 400;
  //   }
  // });
 
  //Api for updatig the Agency details
  apiRouter.put('/agencies/update/:name', async(ctx) => {
    const { name } = helpers.getQuery( ctx, { mergeParams: true });
    const { newname } = await ctx.request.body({type:"json"}).value;
    try {
      ctx.response.body = {updatedAgency:await agencies.updatedAgency({name,newname})}
      ctx.response.status = 201;
    } catch(e) {
      ctx.response.body = {message:e.message}
      ctx.response.status= 400;
    }
    
  })

  //Api for deleting the Agencies form the database
  apiRouter.delete("/agencies/delete/:name",  async (ctx) => {
   const { name } = helpers.getQuery(ctx, { mergeParams:true })
    try {
      const deletedAgency = await agencies.deleteAgency({ name })
      ctx.response.status = 200;
      ctx.response.body = { agency:deletedAgency };
    } catch(e) {
      ctx.response.status = 400;
      ctx.response.body = {message: e.message}
    }
  })

  //Api for creating schema
  apiRouter.post('/schemes/create',  async(ctx) => {
    const { name,description,isActive,category,typeOfBenifits,disabilityCriteria,startDate,endDate,schemeType,location,applicationLink } = await ctx.request.body({type:"json"}).value
  if( !name || !description || !isActive || ! category || ! typeOfBenifits || !startDate || !endDate || !schemeType || !location || !applicationLink ) {
    ctx.response.status = 400;
    return;
  }
  try{
    const schemevalues = await { name,description,isActive,category,typeOfBenifits,disabilityCriteria,startDate,endDate,schemeType,location,applicationLink}
    const createdScheme = await schemes.createdScheme(schemevalues)
    ctx.response.body = {CreatedScehem: createdScheme}
    ctx.response.status = 200
  } catch (e) {
    ctx.response.status = 400;
  }
}
  )

  //get the list of all the schemes
  apiRouter.get("/schemes/get", async (ctx) => {
    ctx.response.body = {
      schemes: await schemes.getAll(),
    };
  });

  app.use(apiRouter.routes());
  app.use(apiRouter.allowedMethods());

  app.use((ctx) => {
    ctx.response.body = "Hello World";
  });

  await app.listen({ 
    port,
    // secure,
    // certFile,
    // keyFile
  });
}



// const PORT = 8080;
// const server = serve(`:${port}`);

// console.log(`Server runnikg at https://localhost;${port}`);

// for await ( let req of server ) {
//     if (req.url === "/api/museums" && req.method === "GET") {
//         req.respond({
//             body: JSON.stringify({
//                 museums: await museum.getAll()
//             }),
//             status: 200
//         })
//         continue
//     }
//     req.respond({ body: 'museums api', status:200 })
//    }
//  }
