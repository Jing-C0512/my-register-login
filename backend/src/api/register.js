import axios from "axios";
import "dotenv/config";
import bcrypt from "bcrypt";

import { getSalt } from "../utils/getSalts.js";
import { findUserByName } from "../utils/findUserByName.js";
import { postUser } from "../utils/postUser.js";

async function register(req, res) {
  const { username, password } = req.body;
  try {
    const user = await findUserByName(username);

    if (user) {
      res.status(409).json({
        message: "User already exists",
        code: "1",
        username: username,
      });
      return;
    } else if (!password) {
      res.status(409).json({
        message: "Password is empty",
        code: "2",
        username: username,
      });
      return;
    } else {
      const salt = await getSalt();

      const hashedPassword = await bcrypt.hash(
        password,
        salt
      );

      const info = {
        username: username,
        password: hashedPassword,
      };

      await postUser(info);

      res.status(200).json({
        message: "Register success",
        code: "0",
        username: username,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export { register };
