import { updateData } from "@/utlis/mongodbapi";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    return new Promise((resolve) => {
      const { notificationID, forUser } = req.body;

      if (!req.body) {
        return res.status(200).json({ message: "Body should no be empty!" });
      }

      if (!forUser) {
        updateData(
          { _id: new ObjectId(notificationID) },
          {
            $set: {
              checked: true,
            },
          },
          "Notifications"
        ).then((result) => {
          res.status(200).json(result);
          resolve();
        });
      } else {
        res.status(200).json("Notificaiton checked");
        resolve();
      }
    });
  }
}
