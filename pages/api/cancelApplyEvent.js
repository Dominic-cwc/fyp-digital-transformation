import { updateData } from "@/utlis/mongodbapi";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    return new Promise((resolve) => {
      const { eventID, username } = req.body;
      if (!eventID || !username) {
        return res.status(200).json({ message: "Body should no be empty!" });
      }

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
  } else if (req.method === "OPTIONS") {
    res.status(200).json({ acceptedMethods: "POST" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
