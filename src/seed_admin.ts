import { supabase as db } from "src/lib/db";
import { Database } from "src/types_supabase";


const IncludeDummyData: Database["public"]["Tables"]["admin"]["Row"][] = [
  {
    id: 1,
    fileName: "region_idf.laz",
    tokens_allotted: 316,
    status: "success",
    username: "lesdecroissant",
    email: "ken99@yahoo.com",
    "wallet address": "0x1234567890",
  },
  {
    id: 2,
    fileName: "demo.laz",
    tokens_allotted: 316,
    status: "pending",
    username: "demo",
    email: "ken99@yahoo.com",
    "wallet address": "0x1234567890",
  },

  {
    id: 3,
    fileName: "toto.laz",
    tokens_allotted: 316,
    status: "pending",
    username: "lesdecroissant",
    email: "abd@yahoo.com",
    "wallet address": "0x1234567890",
  },


  {
    id: 4,
    fileName: "versailles.laz",
    tokens_allotted: 316,
    status: "success",
    username: "lesdecroissant",
    email: "demo@yahoo.com",
    "wallet address": "0x1234567890",
  },
]


async function main() {
    console.log("creating the database  with the user");

    const user = db.from("admin").insert(IncludeDummyData);
      console.log(`added the parameters and did seeding: ${(await user).data}`)
  
}


main()
  .then(async () => {
    await db.getChannels()
  })
  .catch(async (e) => {
    console.error(e)
    await db.removeAllChannels()
    process.exit(1)
  })

