import { fetchData } from "@/utlis/mongodbapi";

export default async function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method === "GET") {
      // get all event, no need query parameter
      fetchData({}, "Events").then((result) => {
        res.status(200).json(result);
        resolve();
      });
    }
  });
}
