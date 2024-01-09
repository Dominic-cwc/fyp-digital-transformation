import { updateData } from "@/utlis/mongodbapi";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    return new Promise((resolve) => {
      const { eventID, username } = req.body;
      updateData(
        { _id: new ObjectId(eventID) },
        {
          $pull: {
            applicant: username,
          },
        },
        "Events"
      ).then((result) => {
        res.status(200).json(result);
        resolve();
      });
    });
  }
}
