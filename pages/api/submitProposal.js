import { insertData } from "@/utlis/mongodbapi";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    const proposal = req.body;
    if (!proposal) {
      return res.status(200).json({ message: "Please fill in all fields" });
    }
    insertData(proposal, "Proposals").then((result) => {
      res.status(200).json({ message: "Proposal submitted" });
    });
  }
}
