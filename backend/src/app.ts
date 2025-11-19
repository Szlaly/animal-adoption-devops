// src/app.ts
import express from "express";
import cors from "cors";
import animalRoutes from "./routes/animal.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import adoptionRoutes from "./routes/adoption.routes";
import supportRoutes from './routes/support.routes';
import path from 'path';
import client from "prom-client";

const app = express();
client.collectDefaultMetrics();
// middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/users", userRoutes);
app.use('/api/support', supportRoutes);
app.use("/api/adoptions", adoptionRoutes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
const apiRequestCounter = new client.Counter({
  name: 'api_requests_total',
  help: 'Összes API hívás',
  labelNames: ['route', 'method']
});

app.use((req, res, next) => {
  apiRequestCounter.inc({ route: req.path, method: req.method });
  next();
});
// Prometheus 
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// teszt route
app.get("/", (req, res) => {
  res.send("API működik");
});

export default app;
