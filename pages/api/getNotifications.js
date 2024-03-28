import { fetchData } from "@/utlis/mongodbapi";

export default async function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method === "GET") {
      // get all related notifications, need query parameter
      const { username, role } = req.query;
      if (!username || !role) {
        res.status(400).json({ message: "Missing query parameter" });
        resolve();
      }

      if (role != "user") {
        fetchData({ receiver: username }, "Notifications").then((result) => {
          res.status(200).json(result);
          resolve();
        });
      } else {
        fetchData({ forUser: true }, "Notifications").then((result) => {
          res.status(200).json(result);
          resolve();
        });
      }
    } else if (req.method === "OPTIONS") {
      res.status(200).json({ acceptedMethods: "GET" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  });
}
