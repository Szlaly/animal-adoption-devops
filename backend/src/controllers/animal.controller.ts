

import { Request, Response } from "express";
import { Animal } from "../models/animal.model";
import { Adoption } from "../models/adoption.model";

export const getAllAnimals = async (req: Request, res: Response) => {
  const animals = await Animal.find();
  res.json(animals);
};

export const getAnimalById = async (req: Request, res: Response): Promise<any> => {
  const animal = await Animal.findById(req.params.id);
  if (!animal) return res.status(404).send("Állat nem található");
  res.json(animal);
};


export const createAnimal = async (req: Request, res: Response) => {
  try {
    const {
      name,
      age,
      species,
      breed,
      description,
      health,
      story
    } = req.body;

    const imageBuffer = req.file?.buffer;
    const imageMimeType = req.file?.mimetype;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newAnimal = new Animal({
      name,
      age,
      species,
      breed,
      description,
      health,
      story,
      imageUrl,
      likedBy: []
    });

    await newAnimal.save();
    res.status(201).json(newAnimal);
  } catch (error) {
    console.error('Hiba állat létrehozásakor:', error);
    res.status(500).json({ message: 'Hiba történt az állat hozzáadásakor.' });
  }
};


export const updateAnimal = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const updateData: any = { ...req.body };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    } else if (updateData.imageUrl === '') {
      updateData.imageUrl = '';
    }

    const updatedAnimal = await Animal.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedAnimal) {
      return res.status(404).json({ message: 'Állat nem található' });
    }

    res.json(updatedAnimal);
  } catch (error) {
    console.error('Hiba az állat frissítésekor:', error);
    res.status(500).json({ message: 'Hiba történt az állat frissítésekor' });
  }
};


export const deleteAnimal = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const deletedAnimal = await Animal.findByIdAndDelete(id);

    if (!deletedAnimal) {
      return res.status(404).json({ message: 'Állat nem található' });
    }

    await Adoption.deleteMany({ animal: id }); 

    res.status(200).json({ message: 'Állat és a kapcsolódó kérelmek törölve' });
  } catch (error) {
    res.status(500).json({ message: 'Hiba az állat törlése közben', error });
  }
};
export const addUpdateToAnimal = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const animal = await Animal.findById(id);
    if (!animal) return res.status(404).json({ message: "Állat nem található." });

    animal.updates.push(text);
    await animal.save();

    res.json(animal);
  } catch (err) {
    res.status(500).json({ message: "Hiba a frissítés hozzáadásakor.", error: err });
  }
};

