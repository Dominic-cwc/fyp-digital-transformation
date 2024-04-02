import { getIronSession } from "iron-session";

export default async function handler(req, res) {
  const session = await getIronSession(req, res, {
    password: process.env.SECRET_COOKIE_PASSWORD,
    cookieName: "session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
  });
  session.destroy();
  res.status(200).json({ message: "Logged out" });
}
