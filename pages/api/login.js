import { fetchData } from "@/utlis/mongodbapi";
import crypto from "crypto-js";
import { getIronSession } from "iron-session";

export default async function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method === "POST") {
      // Process a POST request
      const { username, password } = req.body;
      if (!username || !password) {
        //return res.status(200).json({ message: "Please fill in all fields" });
        res.status(200).json({ message: "Please fill in all fields" });
        resolve();
        return;
      }

      //check if username exist
      fetchData({ username: username }, "Users").then(async (result) => {
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
            //set session
            const session = await getIronSession(req, res, {
              password: process.env.SECRET_COOKIE_PASSWORD,
              cookieName: "session",
              cookieOptions: {
                secure: process.env.NODE_ENV === "production" ? true : false,
              },
            });
            session.user = result[0];
            await session.save();
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
    }
  });
}
