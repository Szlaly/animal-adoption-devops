import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "titkoskulcs";

export const register = async (req: Request, res: Response): Promise<any> => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Email már használatban" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });

  await user.save();
  res.status(201).json({ message: "Sikeres regisztráció" });
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Hibás belépési adatok" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Hibás belépési adatok" });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

  res.json({ token, user: { id: user._id, name: user.name, role: user.role, email:user.email } });
};
export const changePassword = async (req: any, res: Response): Promise<any> => {
  console.log('Kapott body:', req.body);

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Hiányzó mezők" });
  }

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "Felhasználó nem található" });

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) return res.status(400).json({ message: "Hibás jelenlegi jelszó" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Jelszó sikeresen megváltoztatva" });
};

