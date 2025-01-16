import User from "../../../models/User";
import connectDb from "../../../utils/connectDb";
import { verifyPass } from "../../../utils/hashPassword";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  try {
    await connectDb();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "Cannot connect to DB" });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "Invalid data" });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User is not found!" });
  }
  const isValid = await verifyPass(password, user.password);
  if (!isValid) {
    return res
      .status(422)
      .json({ status: "failed", message: "Email or Password is incorrect." });
  }
}
export default handler;
