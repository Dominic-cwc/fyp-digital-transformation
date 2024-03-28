//register a new account

import { fetchData, insertData } from "@/utlis/mongodbapi";
import crypto from "crypto-js";

export default function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method === "POST") {
      // Process a POST request
      const { username, password, role, name } = req.body;
      if (!username || !password || !role || !name) {
        return res.status(200).json({ message: "Please fill in all fields" });
      }

      //check if username exist
      fetchData({ username: username }, "Users").then((result) => {
        if (result.length === 0) {
          //username not exist
          //hashed password
          const hashedPassword = crypto.SHA256(password).toString();

          insertData(
            {
              username: username,
              password: hashedPassword,
              role: role,
              name: name,
            },
            "Users"
          ).then((result) => {
            res.status(200).json({ message: "Register success" });
          });
        } else {
          //username exist
          res.status(200).json({ message: "Username exist" });
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
