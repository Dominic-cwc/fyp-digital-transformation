import { ObjectId } from "mongodb";

export async function fetchData(query, collectionName) {
  await require("./mongodbconnect.js");
  const collection = global.database.collection(collectionName);
  const result = await collection.find(query).toArray();
  return result;
}

export async function insertData(query, collectionName) {
  await require("./mongodbconnect.js");
  const collection = global.database.collection(collectionName);
  if (Array.isArray(query) === false) {
    const result = await collection.insertOne(query);
    return result;
  }
  //Array of objects
  const result = await collection.insertMany(query);
  return result;
}

export async function updateData(query, update, collectionName) {
  await require("./mongodbconnect.js");
  const collection = global.database.collection(collectionName);
  const result = await collection.updateOne(query, update);
  return result;
}

async function deleteData(query, collectionName) {
  await require("./mongodbconnect.js");
  const collection = global.database.collection(collectionName);
  const result = await collection.deleteOne(query);
  return result;
}

// fetchData({
//   _id: { $not: { $eq: new ObjectId("6547229848995bb42ecc7663") } },
// }).then((result) => {
//   result.forEach((element) => {
//     console.log(element.name);
//   });
// });

// insertData([{ sex: "m" }, { sex: "f" }]).then((result) => {
//   console.log(result);
// });

/*

{field: value if equal}
{field: {$operator: {this can be nested}}}

*/
