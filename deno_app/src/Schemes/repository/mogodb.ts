// deno-lint-ignore-file
//deno-lint-ignore-file require-await
// import puppeteer from "https://deno.land/x/puppeteer@9.0.0/mod.ts";
// import { cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";
import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';

const url = 'https://thenationaltrust.gov.in/content/scheme/vikaas.php';

import { Schemes, createScheme } from "../types.ts";
import { Collection, Database } from "../../deps.ts";
import { SchemesRepository } from "../index.ts";

interface RepositoryDependencies {
  storage: Database;
}

export class Repository implements SchemesRepository {
  storage: Collection<Schemes>;
  constructor({ storage }: RepositoryDependencies) {
    this.storage = storage.collection<Schemes>("Schemes");
  }

  //Check if the schems already exists
  async exists (name:string) {
    return Boolean(await this.storage.findOne({ name }));
  }
  //retriving all the schemes from the database
  async getAll() {
    const all_Schemes = await this.storage.find().toArray();
    return all_Schemes;
  }

//creating a new scheme in the database
async createScheme (scheme: Schemes) {
    try{
        const createdScheme  = {...scheme}
        await this.storage.insertOne({ ...createdScheme });
        return createdScheme;
    } catch(e) {
         return new Error ("unable to create the scheme ")
    }
}


 async  schemesFetching(scheme:createScheme)  {
  try {
      // const browser = await puppeteer.launch();
      // const page = await browser.newPage();
      // await page.goto(url);
  
      // const html = await page.content();
  
      // const $ = cheerio.load(html);
  
      // const pageText = $('#obj').text();
      
      const res = await fetch(url);
      const html = await res.text();
      const document: any = new DOMParser().parseFromString(html, 'text/html');
      
      const pageText = document.querySelector('#obj').textContent;
      console.log(pageText)
    
      // const createdSchemeDetails:createScheme =  {
      //   name:"hello guys",
      //   description:pageText,
      //   link: new URL('ww.google.com'),
      //   heading:"this is that"

      // }
      //  await this.storage.insertOne(
      //   {
      //     ...createdSchemeDetails
      //   }

      //   )
      //   console.log(createdSchemeDetails)
      //   return createdSchemeDetails;
  

  } catch(error) {
      return error
  }
  }
}

// function getAll() {
// throw new Error("Function not implemented.");
// }
