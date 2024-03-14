import { fetchData } from "@/utlis/mongodbapi";

export default async function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method === "GET") {
      //check if username exist
      fetchData(
        {
          $or: [{ role: "centermanager" }, { role: "deptmanager" }],
        },
        "Users"
      ).then((result) => {
        result.forEach((element) => {
          delete element.password;
          delete element._id;
        });
        res.status(200).json(result);
        resolve();
      });
    } else if (req.method === "OPTIONS") {
      res.status(200).json({ acceptedMethods: "GET" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
      resolve();
    }
  });
}
