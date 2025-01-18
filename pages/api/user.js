import { verifyToken } from "../../utils/hashPassword";

async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }
  const { token } = req.cookies;
  const secretKey = process.env.SECRET_KEY;
  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in" });
  }

  const result = verifyToken(token, secretKey);
  if (result) {
    console.log("data", result);
    res.status(200).json({ status: "success", data: result });
  } else {
    res.status(401).json({ status: "failed", message: "you are unauthorized" });
  }
}
export default handler;
