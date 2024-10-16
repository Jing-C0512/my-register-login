import jwt from "jsonwebtoken";
import "dotenv/config";

function genToken(info, expires_time) {
  const newInfo = { ...info, date: new Date() };
  const token = jwt.sign(
    newInfo,
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: expires_time,
    }
  );

  return token;
}

export { genToken };
