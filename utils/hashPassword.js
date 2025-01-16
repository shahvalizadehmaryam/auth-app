import { hash, compare } from "bcryptjs";
async function hashPassword(password) {
  const hashedPass = await hash(password, 12);
  console.log(hashedPass);
  return hashedPass;
}
async function verifyPass(password, hashedPass) {
  const isValid = compare(password, hashedPass);
  console.log(isValid);
  return isValid;
}
export { hashPassword, verifyPass };
