import { fetchData } from "@/utlis/mongodbapi";
import crypto from "crypto-js";

export default async function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method === "POST") {
      // Process a POST request
      const { username, password } = req.body;
      if (!username || !password) {
        //return res.status(200).json({ message: "Please fill in all fields" });
        res.status(200).json({ message: "Please fill in all fields" });
        resolve();
      }

      //check if username exist
      fetchData({ username: username }, "Users").then((result) => {
        if (result.length === 0) {
          //username not exist
          res
            .status(200)
            .json({ message: "Username or password is incorrect" });
        } else {
          //username exist
          if (result[0].password === crypto.SHA256(password).toString()) {
            //password correct
            delete result[0].password;
            res.status(200).json(result[0]);
          } else {
            //password incorrect
            res
              .status(200)
              .json({ message: "Username or password is incorrect" });
          }
        }
        resolve();
      });
    } else if (req.method === "OPTIONS") {
      res.status(200).json({ acceptedMethods: "POST" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
      resolve();
    }
  });
}
