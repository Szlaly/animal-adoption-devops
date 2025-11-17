import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => {
    console.log("MongoDB kapcsolódva");
    app.listen(PORT, () => {
      console.log(`Szerver fut: http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("DB hiba: ", err));
