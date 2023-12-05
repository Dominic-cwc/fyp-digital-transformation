import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to the MongoDB cluster
async function connect() {
  await client.connect();
  global.database = client.db("FYP-Project");
}
module.exports = connect();
