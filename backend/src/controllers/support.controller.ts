import { Request, Response } from 'express';
import { Support } from '../models/support.model';
declare module "express" {
  interface Request {
    user?: {
      id: string;
      role: "user" | "admin";
      name?: string;
      email?: string;
    };
  }
}
export const createSupportRequest = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.id;
  const { subject, message, animal } = req.body;

  if (!userId) {
    return res.status(401).json({ message: 'Nem vagy bejelentkezve' });
  }
  if (!subject || !message) {
    return res.status(400).json({ message: 'A tárgy és az üzenet megadása kötelező.' });
  }

  try {
    const support = new Support({
      user: userId,
      subject,
      message,
      animal: animal || null,
      status: 'open',
      messages: []
    });
    await support.save();
    res.status(201).json({ message: 'Support kérés elküldve', support });
  } catch (err) {
    res.status(500).json({ message: 'Hiba történt a mentés során', error: err });
  }
};

export const getAllSupportRequests = async (_req: Request, res: Response) => {
  try {
    const supports = await Support.find()
      .populate('user', 'name email')
      .populate('animal', 'name species')
      .populate('messages.sender', 'name email');
    res.json(supports);
  } catch (err) {
    res.status(500).json({ message: 'Hiba a lekérdezés során', error: err });
  }
};

export const getUserSupportRequests = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Nem vagy bejelentkezve' });
  }

  try {
    const supports = await Support.find({ user: userId })
      .populate('animal', 'name species')
      .populate('messages.sender', 'name email');
    res.json(supports);
  } catch (err) {
    res.status(500).json({ message: 'Hiba a saját kérdések lekérdezésekor', error: err });
  }
};

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: "user" | "admin";
  };
}
export const addSupportReply = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
  const supportId = req.params.id;
  const userId = req.user?.id;
  const text = req.body.message; 

  if (!text) {
    return res.status(400).json({ message: "Üzenet szöveg szükséges" });
  }

  try {
    const support = await Support.findById(supportId);
    if (!support) {
      return res.status(404).json({ message: "Support kérés nem található" });
    }

    support.messages.push({
      sender: userId,
      text: req.body.message,
      createdAt: new Date()
    });

    await support.save();
    await support.populate('messages.sender', 'name email');
    res.status(200).json({ message: "Válasz elküldve", support });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hiba a válasz mentése közben" });
  }
};
export const adminAddReply = async (req: Request, res: Response): Promise<any> => {
  try {
    const { requestId, message } = req.body;
    const adminId = req.user?.id; 

    if (!requestId || !message || !message.text) {
      return res.status(400).json({ message: 'requestId, message és message.text szükséges' });
    }

    const supportRequest = await Support.findById(requestId);
    if (!supportRequest) {
      return res.status(404).json({ message: 'Nincs ilyen support kérés' });
    }

    supportRequest.messages.push({
      text: message.text,
      sender: adminId,
      sentAt: new Date(),
    });

    await supportRequest.save();
    await supportRequest.populate('messages.sender', 'name email'); 

    res.status(200).json({ message: "Admin válasz elküldve", supportRequest });
  } catch (error) {
    console.error('Admin válasz hiba:', error);
    res.status(500).json({ message: 'Szerverhiba' });
  }
};


export const addResponseToSupportRequest = async (req: Request, res: Response) => {
  const { requestId, response } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ message: "A felhasználó azonosítója nem található." });
  }

  if (!response || response.trim() === "") {
    return res.status(400).json({ message: "A válasz üres." });
  }

  try {
    const supportRequest = await Support.findById(requestId);
    if (!supportRequest) {
      return res.status(404).json({ message: "Támogatási kérés nem található." });
    }

    supportRequest.messages.push({
      sender: userId,
      text: response,
      sentAt: new Date(),
    });

    await supportRequest.save();
    res.status(200).json({ message: "Válasz sikeresen hozzáadva.", supportRequest });
  } catch (error) {
    console.error("Hiba a válasz mentésekor:", error);
    res.status(500).json({ message: "Hiba történt a válasz küldésekor." });
  }
};
export const closeSupportRequest = async (req: Request, res: Response): Promise<any> => {
  try {
    const support = await Support.findByIdAndUpdate(
      req.params.id,
      { status: 'closed' }, 
      { new: true }
    );
    if (!support) return res.status(404).json({ message: 'Support kérés nem található' });
    res.json(support);
  } catch (err) {
    res.status(500).json({ message: 'Hiba a lezárás során' });
  }
};



