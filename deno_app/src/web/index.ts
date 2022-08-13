import { SchemesController } from "../Schemes/index.ts";
import { Algorithm, Application, Router, oakCors, jwtMiddleware } from "../deps.ts";
import { UserController } from "../users/index.ts";
import { AgencyController } from "../Agencies/index.ts";
import { _format } from "https://deno.land/std@0.140.0/path/_util.ts";

interface CreateServerDependencies {
  configuration: {
    port: number;
    authorization: {
      key: string,
      algorithm:Algorithm
    },
    allowedOrigin: string[],
    // secure:boolean,
    // keyFile:string,
    // certFile:string
  },
  schemes: SchemesController;
  user: UserController;
  agencies:AgencyController
}

// const addTestHeaderMiddleware: RouterMiddleware = async (ctx, next) => {
//   ctx.response.headers.set("X-Test", "true");
//   await next();
// };


export async function createServer({
  configuration: {
    port,
    authorization,
    allowedOrigin,
    // secure,
    // keyFile,
    // certFile
  },
  schemes,
  user,
  agencies,
}: CreateServerDependencies) {
  const app = new Application();
  
  const authenticated = jwtMiddleware(authorization);

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

  app.addEventListener("listen", (e) => {
    console.log(
      `Application running at   'http' ://${e.hostname || "loaclhost"}:${port}`,
    );
  });

  app.addEventListener("error", (e) => {
    console.log("An error occured", e.message);
  });

//using the cors
app.use(
  oakCors({ origin: allowedOrigin })
);

  const apiRouter = new Router({ prefix: "/api" });

  apiRouter.use(async (_, next) => {
    console.log("Request was made to the API ROUTER");
    await next();
  });

  apiRouter.get("/schemes", async (ctx) => {
    ctx.response.body = {
      museums: await schemes.getAll(),
    };
  });

  apiRouter.post("/users/register", async (ctx) => {
    const { username, password,email,contactNumber } = await ctx.request.body({ type: "json" })
      .value;

    if (!username || !password || !email || !contactNumber) {
      ctx.response.status = 400;

      return;
    }

    try {
      const createdUser = await user.register({
        username,
        password,
        email,
        contactNumber,
      });
      ctx.response.status = 201;
      ctx.response.body = { user: createdUser };
    } catch (e) {
      ctx.response.status = 400;
      ctx.response.body = { message: e.message };
    }
  });

  //login route for users
  apiRouter.post("/users/login", async (ctx) => {
    const { username, password } = await ctx.request.body().value;
    try {
      const { user: loginUser, token } = await user.login({
        username,
        password
      });

      ctx.response.body = { user: loginUser, token };
      ctx.response.status = 201;
    } catch (e) {
      ctx.response.body = { message: e.message };
      ctx.response.status = 400;
    }
  });

  //Register route for Agencies
  apiRouter.post('/agencies/register', async (ctx) => {
    const { name, email, Schemes, TypeOfAgency, password } = await ctx.request.body({type:"json"}).value;
    //check if all the inputs were given
    if( !name || !email || ! Schemes || TypeOfAgency || !password ) {
      ctx.response.status = 400;
      return;
    }

    try {
      const CreatedAgency = await agencies.register({
        name,
        email,
        Schemes,
        TypeOfAgency,
        password
      });
      ctx.response.status = 201;
      ctx.response.body = { agencies:CreatedAgency }
    } catch(e) {
      ctx.response.status = 400;
      ctx.response.body = { message:e.message }
    }
  })

  //login route for agencies
  apiRouter.post('/agencies/login', async (ctx) => {
    const { name, password } = await ctx.request.body({type:"json"}).value;
    try {
      const { agencies: loginAgency, token } = await agencies.login({
        name,
        password,
      });

      ctx.response.body = { agencies: loginAgency, token };
      ctx.response.status = 201;
    } catch (e) {
      ctx.response.body = { message: e.message };
      ctx.response.status = 400;
    }
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
