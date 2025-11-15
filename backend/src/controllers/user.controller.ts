import { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../models/user.model";


export const addFavorite = async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).user.id;
  const animalId = req.params.animalId;

  // Ellenőrzés, hogy az ID érvényes-e
  if (!mongoose.Types.ObjectId.isValid(animalId)) {
    return res.status(400).json({ message: "Érvénytelen állat ID" });
  }

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "Felhasználó nem található" });

  const animalObjectId = new mongoose.Types.ObjectId(animalId);

  if (user.favorites.some(fav => fav.equals(animalObjectId))) {
    return res.status(400).json({ message: "Ez az állat már a kedvencek között van" });
  }

  user.favorites.push(animalObjectId);
  await user.save();

  res.json({ message: "Hozzáadva a kedvencekhez", favorites: user.favorites });
};
export const removeFavorite = async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).user.id;
  const animalId = req.params.animalId;

  if (!mongoose.Types.ObjectId.isValid(animalId)) {
    return res.status(400).json({ message: "Érvénytelen állat ID" });
  }

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "Felhasználó nem található" });

  const animalObjectId = new mongoose.Types.ObjectId(animalId);

  user.favorites = user.favorites.filter(fav => !fav.equals(animalObjectId));
  await user.save();

  res.json({ message: "Eltávolítva a kedvencekből", favorites: user.favorites });
};
export const getFavorites = async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).user.id;

  const user = await User.findById(userId).populate("favorites");
  if (!user) return res.status(404).json({ message: "Felhasználó nem található" });

  res.json({ favorites: user.favorites });
};

export const deleteMe = async (req: any, res: Response) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "Fiók törölve" });
  } catch (err) {
    res.status(500).json({ message: "Hiba történt a törlés során" });
  }
};

