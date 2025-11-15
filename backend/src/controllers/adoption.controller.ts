import { Request, Response } from "express";
import { Adoption } from "../models/adoption.model";
import mongoose from "mongoose";

// src/controllers/adoption.controller.ts
export const getAllAdoptions = async (req: Request, res: Response) => {
  try {
    const adoptions = await Adoption.find()
      .populate('user', 'name email')     
      .populate('animal', 'name species');  

    res.json(adoptions);
  } catch (err) {
    res.status(500).json({ message: 'Hiba az örökbefogadási kérelmek lekérdezésekor', error: err });
  }
};


export const getMyAdoptions = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const adoptions = await Adoption.find({ user: userId }).populate("animal");
    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: "Hiba történt a saját kérelmek lekérésekor.", error });
  }
};

export const updateAdoptionStatus = async (req: Request, res: Response): Promise<any> => {
  const { status, meetingDate } = req.body;
  const { id } = req.params;

  const adoption = await Adoption.findById(id);
  if (!adoption) return res.status(404).json({ message: "Kérelem nem található" });

  adoption.status = status || adoption.status;
  adoption.meetingDate = meetingDate || adoption.meetingDate;

  await adoption.save();
  res.json(adoption);
};

export const submitAdoptionRequest = async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).user.id;
  const { animalId, message, email, name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(animalId)) {
    return res.status(400).json({ message: "Érvénytelen állat ID" });
  }

  if (!email || !name) {
    return res.status(400).json({ message: "Hiányzó név vagy email" });
  }

  try {
    const adoption = new Adoption({
      user: userId,
      animal: animalId,
      message,
      status: "pending",
      email,
      name,
    });

    await adoption.save();
    res.status(201).json({ message: "Örökbefogadási kérelem elküldve", adoption });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hiba történt a mentés közben" });
  }
};
