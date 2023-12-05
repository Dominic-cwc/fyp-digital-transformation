import { fetchData } from "@/utlis/mongodbapi";
import crypto from "crypto-js";

export default function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(200).json({ message: "Please fill in all fields" });
    }

    //check if username exist
    fetchData({ username: username }, "Users").then((result) => {
      if (result.length === 0) {
        //username not exist
        res.status(200).json({ message: "Username or password is incorrect" });
      } else {
        //username exist
        if (result[0].password === crypto.SHA256(password).toString()) {
          //password correct
          res.status(200).json(result[0]);
        } else {
          //password incorrect
          res
            .status(200)
            .json({ message: "Username or password is incorrect" });
        }
      }
    });
  }
}
