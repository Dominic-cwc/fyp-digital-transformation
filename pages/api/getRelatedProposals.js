import { fetchData } from "@/utlis/mongodbapi";

export default async function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method === "GET") {
      const { username, role } = req.query;

      if (role === "staff") {
        fetchData({ "createdby.username": username }, "Proposals").then(
          (result) => {
            res.status(200).json(result);
            resolve();
          }
        );
      } else if (role === "deptmanager") {
        fetchData({ "deptmanager.username": username }, "Proposals").then(
          (result) => {
            res.status(200).json(result);
            resolve();
          }
        );
      } else if (role === "centermanager") {
        fetchData(
          {
            $and: [
              { "centermanager.username": username },
              { currentReviewer: username },
            ],
          },
          "Proposals"
        ).then((result) => {
          res.status(200).json(result);
          resolve();
        });
      }
    }
  });
}
