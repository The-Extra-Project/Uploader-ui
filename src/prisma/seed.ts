// import { db } from "../lib/db";
// import { Prisma } from "@prisma/client";
// import { randomUUID, UUID } from "crypto";
// const userInfo = [
//     {
//       username: "dhruv",
//       passwordEnc: "password123",
//       UserProfile: {
//         create: [
//           {
//             id: 1,
//             walletAddress: "0xdemo",
//             deleting: false,
//             walletSupplyId: 1,
//             createdAt: new Date(),
//             emailStatus: "INTRO",
//             description_user: "Sample description",
//             storageTypeId: 1,
//             filesOwned: {
//               create: [
//                 {
//                   fileCids: "",
//                   storageTypeId: 21092019,
//                   userOwnerId: 100,
//                 },
//               ],
//             },
//           },
//         ],
//       },
//     },
//   ] satisfies Prisma.UserCreateInput[]


// //   storageType: {
// //     create: [
// //       {
// //         id: 1,
// //         storageCategory: "web3Storage",
// //         filesDir: "filesDir",
// //       },
// //     ],
// //   },


// // walletSupply: {
// //     create: [
// //       {
// //         id: 1,
// //         supplyAllotted: 1000000000000000000000,
// //       },
// //     ],
// //   },



// async function main() {
//     console.log("creating the database  with the user");

//     const user = await db.user.upsert({
//         where: {id: 1},
//         update: userInfo[0], // Data to update if the user already exists
//         create: userInfo[0], // Data to create if the user doesn't exist
//     })
//       console.log(`Created user with id: ${user.id}`)
  
//     console.log("seeding");
// }

// main()
//   .then(async () => {
//     await db.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await db.$disconnect()
//     process.exit(1)
//   })
