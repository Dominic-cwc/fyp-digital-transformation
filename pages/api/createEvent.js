import { insertData } from "@/utlis/mongodbapi";

export default function handler(req, res) {
  if (req.method === "POST") {
    return new Promise((resolve) => {
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
