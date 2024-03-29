import { fetchData } from "@/utlis/mongodbapi";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method === "POST") {
      // Process a POST request
      const { _id, username, name, role } = req.body;
      if (!_id || !username || !name || !role) {
        return res.status(401).json({ message: "Please login." });
      }

      //check if username exist
      fetchData({ _id: new ObjectId(_id) }, "Users").then((result) => {
        if (result.length === 0) {
          //user not exist
          res.status(401).json({ message: "User not exist." });
        } else {
          //_id found
          if (
            result[0].username === username &&
            result[0].name === name &&
            result[0].role === role
          ) {
            //detials correct
            res.status(200).json("Authenticated");
          } else {
            //Details incorrect
            res.status(401).json({ message: "User not exist." });
          }
        }
        resolve();
      });
    } else if (req.method === "OPTIONS") {
      res.status(200).json({ acceptedMethods: "POST" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  });
}
