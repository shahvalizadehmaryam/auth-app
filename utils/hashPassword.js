import { hash } from "bcryptjs";
async function hashPassword(password) {
  const hashedPass = await hash(password, 12);
  console.log(hashedPass);
  return hashedPass;
}
export  {hashPassword};
