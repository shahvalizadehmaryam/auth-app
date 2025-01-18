import { hash, compare } from "bcryptjs";
import { verify } from "jsonwebtoken";
async function hashPassword(password) {
  const hashedPass = await hash(password, 12);
  console.log(hashedPass);
  return hashedPass;
}
async function verifyPass(password, hashedPass) {
  const isValid = await compare(password, hashedPass);
  console.log(isValid);
  return isValid;
}
 function verifyToken(token, secretKey) {
  try {
    const result = verify(token, secretKey);
    return { email: result.email };
  } catch (error) {
    return false;
  }
}

export { hashPassword, verifyPass, verifyToken };
