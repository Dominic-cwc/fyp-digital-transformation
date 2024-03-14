import { insertData } from "@/utlis/mongodbapi";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    const proposal = req.body;
    if (!proposal) {
      return res.status(200).json({ message: "Please fill in all fields" });
    }

    proposal.status = "pending";
    proposal.timestamp = new Date().toISOString();
    proposal.deptcomment = "";
    proposal.centercomment = "";

    insertData(proposal, "Proposals").then((result) => {
      res.status(200).json({ message: "Proposal submitted" });
      return new Promise((resolve, reject) => {
        resolve(result);
      });
    });
  } else if (req.method === "OPTIONS") {
    res.status(200).json({ acceptedMethods: "POST" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
    resolve();
  }
}
