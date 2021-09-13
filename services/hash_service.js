import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

//hash password
export const hashPassword = (pass) => {
  const hash = bcrypt.hashSync(pass, salt);
  return hash;
};

//compare password
export const comparePassword = (inputPass, dbPass) => {
  const result = bcrypt.compareSync(inputPass, dbPass);
  return result;
};
