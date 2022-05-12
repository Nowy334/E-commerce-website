import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const withProtect = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).send("Access Denied");

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err, user) => {
        if (err) return res.status(400).send("Invalid Token");
        return handler(req, res);
      }
    );
  };
};

export default withProtect;
