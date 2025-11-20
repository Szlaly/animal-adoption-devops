import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import logger from './logger';
dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI || "")
  .then(() => {
    logger.info("MongoDB kapcsolódva");
    app.listen(PORT, () => {
      logger.info(`Szerver fut: http://localhost:${PORT}`);
    });
  })
  .catch((err) => logger.error("DB hiba: ", err));
