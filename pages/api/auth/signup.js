import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";
import { hashPassword } from "../../../utils/hashPassword";

async function handler(req, res) {
  if (req.method !== "POST") return;
  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Cannot connect to DB" });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "Invalid data" });
  }
  const existUser = await User.findOne({ email });
  if (existUser) {
    return res
      .status(422)
      .json({ status: "failed", message: "User already exist." });
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({ email: email, password: hashedPassword });
  console.log(newUser);
  return res
    .status(201)
    .json({ status: "Success", message: "user created successfully!" });
}
export default handler;
