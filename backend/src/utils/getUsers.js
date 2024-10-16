import axios from "axios";
import "dotenv/config";

import { usersDBPath, bcryptDBPath } from "./dataPath.js";

async function getUsers() {
  console.log("1", usersDBPath);
  const users = await axios
    .get(usersDBPath)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return users;
}

export { getUsers };
