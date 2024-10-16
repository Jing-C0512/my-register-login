import { getUsers } from "./getUsers.js";
async function findUserByName(name) {
  try {
    const users = await getUsers();
    // console.log(users);
    if (!users) {
      return null;
    }
    return users.find((user) => user.username === name);
  } catch (err) {
    console.log(err);
  }
}

export { findUserByName };
