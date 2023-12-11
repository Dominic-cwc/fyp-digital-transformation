import { fetchData } from "@/utlis/mongodbapi";

export default async function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method === "GET") {
      //check if username exist
      fetchData(
        {
          $or: [{ role: "staff" }, { role: "manager" }],
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
    }
  });
}
