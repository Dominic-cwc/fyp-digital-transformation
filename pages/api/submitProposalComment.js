import { updateData } from "@/utlis/mongodbapi";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method === "POST") {
      if (!req.body) {
        return res.status(200).json({ message: "Body should no be empty!" });
      }

      const {
        deptmanagerComment,
        centermanagerComment,
        proposalStatus,
        proposalID,
        role,
        centerManager_username,
      } = req.body;

      if (role === "deptmanager") {
        updateData(
          { _id: new ObjectId(proposalID) },
          {
            $set: {
              deptcomment: deptmanagerComment,
              currentReviewer: centerManager_username,
            },
          },
          "Proposals"
        ).then((result) => {
          res.status(200).json(result);
          resolve();
        });
      } else if (role === "centermanager") {
        updateData(
          { _id: new ObjectId(proposalID) },
          {
            $set: {
              centercomment: centermanagerComment,
              status: proposalStatus,
            },
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
