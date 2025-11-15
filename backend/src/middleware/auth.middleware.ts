import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "titkoskulcs";

interface JwtPayload {
  id: string;
  role: "user" | "admin";
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
console.log("Authorization header:", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Hiányzó vagy érvénytelen token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    console.log("Decoded token:", decoded);
    (req as any).user = decoded;
    next();
  } catch (err) {
    console.error("Token verify error:", err);
    res.status(401).json({ message: "Érvénytelen token" });
    return;
  }
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = (req as any).user;

  if (user?.role !== "admin") {
    res.status(403).json({ message: "Admin jogosultság szükséges" });
    return;
  }

  next();
};
