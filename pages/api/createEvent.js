import { insertData } from "@/utlis/mongodbapi";

export default function handler(req, res) {
  if (req.method === "POST") {
    return new Promise((resolve) => {
      if (!req.body) {
        return res.status(200).json({ message: "Body should no be empty!" });
      }

      const {
        eventName,
        eventTypes,
        eventDate,
        eventTime,
        eventWeek,
        eventNum,
        eventLocation,
        eventTarget,
        eventQuota,
        eventFee,
        eventpurpose,
      } = req.body;

      insertData(
        {
          eventName: eventName,
          eventTypes: eventTypes,
          eventDate: eventDate,
          eventTime: eventTime,
          eventWeek: eventWeek,
          eventNum: eventNum,
          eventLocation: eventLocation,
          eventTarget: eventTarget,
          eventQuota: eventQuota,
          eventFee: eventFee,
          eventpurpose: eventpurpose,
          createdTime: new Date().toLocaleString(),
          applicant: [],
        },
        "Events"
      ).then((result) => {
        res.status(200).json({ message: "Create Event Success" });
        resolve();
      });
    });
  }
}
