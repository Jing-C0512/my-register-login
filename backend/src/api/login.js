import axios from "axios";
import "dotenv/config";
import bcrypt from "bcrypt";
import { findUserByName } from "../utils/findUserByName.js";
import { genToken } from "../utils/genToken.js";

async function login(req, res) {
  const { username, password } = req.body;
  const user = await findUserByName(username);
  if (!user) {
    res
      .status(500)
      .json({ message: "No user found", code: 1 });
    return;
  } else {
    const match = await bcrypt.compare(
      password,
      user.password
    );
    if (!match) {
      res
        .status(401)
        .json({ message: "Password not match", code: 3 });
      return;
    }

    const userTokenInfo = {
      username,
      password,
    };

    const token = genToken(userTokenInfo, "1h");

    res
      .status(200)
      .json({
        message: "Login success",
        code: 0,
        token,
        username,
      });
    return;
  }
}

export { login };
