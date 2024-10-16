import axios from "axios";
import { usersDBPath } from "./dataPath.js";
async function postUser(info) {
  axios.post(usersDBPath, info);
}

export { postUser };
