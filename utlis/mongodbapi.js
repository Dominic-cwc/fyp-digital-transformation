import { ObjectId } from "mongodb";

export async function fetchData(query, collectionName) {
  if (global.database === undefined) {
    await require("./mongodbconnect.js");
  }
  const session = global.client.startSession();
  let result;
  try {
    session.startTransaction();
    const collection = global.database.collection(collectionName);
    result = await collection.find(query, { session }).toArray();
    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
  return result;
}

export async function insertData(query, collectionName) {
  if (global.database === undefined) {
    await require("./mongodbconnect.js");
  }
  const session = global.client.startSession();
  let result;

  try {
    session.startTransaction();
    const collection = global.database.collection(collectionName);
    if (Array.isArray(query) === false) {
      result = await collection.insertOne(query, { session });
      await session.commitTransaction();
    }
    //Array of objects
    else {
      result = await collection.insertMany(query, { session });
      await session.commitTransaction();
    }
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
  return result;
}

export async function updateData(query, update, collectionName) {
  if (global.database === undefined) {
    await require("./mongodbconnect.js");
  }
  const session = global.client.startSession();
  let result;
  try {
    session.startTransaction();
    const collection = global.database.collection(collectionName);
    result = await collection.updateOne(query, update, { session });
    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }

  return result;
}

export async function deleteData(query, collectionName) {
  if (global.database === undefined) {
    await require("./mongodbconnect.js");
  }
  const session = global.client.startSession();
  let result;
  try {
    session.startTransaction();
    const collection = global.database.collection(collectionName);
    result = await collection.deleteOne(query, { session });
    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }

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
