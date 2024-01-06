import { updateData } from "@/utlis/mongodbapi";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  return new Promise((resolve) => {
    if (req.method === "POST") {
      const {
        deptmanagerComment,
        centermanagerComment,
        proposalStatus,
        proposalID,
        role,
      } = req.body;

      if (role === "deptmanager") {
        updateData(
          { _id: new ObjectId(proposalID) },
          {
            $set: {
              deptcomment: deptmanagerComment,
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
