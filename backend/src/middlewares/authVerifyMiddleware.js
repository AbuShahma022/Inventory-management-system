import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authVerifyMiddleware = (req, res, next) => {
  try {
    // 1. Get token from headers (exactly as sent in Postman)
    const token = req.headers["token"];
    

    if (!token) {
      return res.status(401).json({ status: "failed", data: "No token provided" });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

    // 3. Attach decoded email to headers
   req.headers["email"] = decoded.data; // your token payload stores email in `data`
   


    // 4. Continue to next middleware/controller
    next();
  } catch (error) {
    return res.status(401).json({ status: "failed", data: "Invalid or expired token" });
  }
};

export default authVerifyMiddleware;
