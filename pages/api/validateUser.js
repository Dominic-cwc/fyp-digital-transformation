import { getIronSession } from "iron-session";

export default async function handler(req, res) {
  return new Promise(async (resolve) => {
    if (req.method === "POST") {
      // Process a POST request
      //check if user is authenticated
      const session = await getIronSession(req, res, {
        password: process.env.SECRET_COOKIE_PASSWORD,
        cookieName: "session",
        cookieOptions: {
          secure: process.env.NODE_ENV === "production" ? true : false,
        },
      });

      if (!session || !session.user) {
        res.status(401).json({ message: "Please login." });
        resolve();
        return;
      }

      const { _id, username, name, role } = req.body;
      if (!_id || !username || !name || !role) {
        res.status(401).json({ message: "Please login." });
        resolve();
        return;
      }
      res.status(200).json({ message: "Authenticated" });
    } else if (req.method === "OPTIONS") {
      res.status(200).json({ acceptedMethods: "POST" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  });
}
