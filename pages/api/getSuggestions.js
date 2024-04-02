import axios from "axios";

export default async (req, res) => {
  return new Promise((resolve) => {
    if (req.method === "POST") {
      const { eventDetailforAI, origin } = req.body;
      axios
        .post(
          `${process.env.PYTHON_BACKEND_URL}/api/getSuggestions`,
          eventDetailforAI,
          {
            headers: {
              Origin: origin,
            },
          }
        )
        .then((response) => {
          res.status(200).json(response.data);
          resolve();
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
          resolve();
        });
    } else if (req.method === "OPTIONS") {
      res.status(200).json({ acceptedMethods: "POST" });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  });
};
