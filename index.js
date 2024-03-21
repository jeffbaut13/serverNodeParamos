import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sheetRoute from "./routes/sheet.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(bodyParser.json());

// Middleware CORS
app.use(cors());

// Rutas
app.get("/", (req, res) => {
  res.send("Listo el servidor para usar");
});

app.use("/api/sheet", sheetRoute);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error interno del servidor");
});

// Iniciar el servidor con nodemon
app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
