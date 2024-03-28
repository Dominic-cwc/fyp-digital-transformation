import { insertData } from "@/utlis/mongodbapi";

export default function handler(req, res) {
  if (req.method === "POST") {
    return new Promise((resolve) => {
      if (!req.body) {
        return res.status(200).json({ message: "Body should no be empty!" });
      }

      const { receiver, title, content, checked, flag, forUser } = req.body;

      insertData(
        {
          receiver: receiver,
          title: title,
          content: content,
          checked: checked,
          flag: flag,
          time: new Date().toLocaleString(),
          forUser: forUser,
        },
        "Notifications"
      ).then((result) => {
        res.status(200).json({ message: "Create Notification Success" });
        resolve();
      });
    });
  } else if (req.method === "OPTIONS") {
    res.status(200).json({ acceptedMethods: "POST" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
