import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authVerifyMiddleware = (req, res, next) => {
  try {
    const { token } = req.headers;

  

    if (!token) {
      return res.status(401).json({ status: "failed", data: "No token provided" });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.headers.email = decoded.data;

    next();
  } catch (error) {
    return res.status(401).json({ status: "failed", data: "Invalid or expired token" });
  }
};

export default authVerifyMiddleware;
