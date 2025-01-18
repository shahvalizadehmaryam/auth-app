import { sign } from "jsonwebtoken";
import User from "../../../models/User";
import connectDb from "../../../utils/connectDb";
import { verifyPass } from "../../../utils/hashPassword";
import { serialize } from "cookie";

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
  const secretKey = process.env.SECRET_KEY;
  const expiration = 24 * 60 * 60;
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
  // generate token
  const token = sign({ email }, secretKey, {
    expiresIn: expiration,
  });
  // by cookie library token set to cookie
  const serialized = {
    httpOnly: true,
    // bade 24h in cookie hazf beshe
    maxAge: expiration,
    path: "/",
    //path => har req i ke be samte server biyad dakhelesh cookie bashe.
  };
  res
    .status(200)
    .setHeader("Set-Cookie", serialize("token", token, serialized))
    .json({
      status: "success",
      message: "Logged In",
      data: { email: user.email },
    });
}
export default handler;
