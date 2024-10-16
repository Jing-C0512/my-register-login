import jwt from "jsonwebtoken";
import "dotenv/config";

function authToken(req, res, next) {
  const headers = req.headers;
  const token = headers?.authorization?.split(" ")[1];

  // console.log(token);

  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        err
          ? res
              .status(403)
              .json({ message: "Unauthorized", code: 2 })
          : null;

        req.body.username = decoded.username;
        req.body.password = decoded.password;
        // console.log(decoded.username, decoded.password);
      }
    );
  }

  next();
}

export { authToken };
