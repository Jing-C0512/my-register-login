import "dotenv/config";

const defaultDBPath = "http://localhost:6000";

export const usersDBPath =
  (process.env.DB_PATH || defaultDBPath) + "/user";
export const bcryptDBPath =
  (process.env.DB_PATH || defaultDBPath) + "/bcrypt";
