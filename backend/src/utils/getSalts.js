import axios from "axios";
import { usersDBPath, bcryptDBPath } from "./dataPath.js";

async function getSalts() {
  const getSaltRounds = await axios
    .get(bcryptDBPath)
    .then((res) => res.data);
  return getSaltRounds;
}

async function getSalt(id = "1") {
  try {
    const salts = await getSalts();
    const salt = salts.find((salt) => salt.id === id);
    if (salt) {
      return salt.saltRounds;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

export { getSalts, getSalt };
