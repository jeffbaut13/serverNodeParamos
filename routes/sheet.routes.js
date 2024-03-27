import axios from "axios";
import express from "express";
import { google } from "googleapis";

const router = express.Router();

// Ruta para manejar las solicitudes POST a /sheet
router.post("/", async (req, res) => {
  try {
    const body = req.body;

    /****get response */

    // Crear el contacto en GetResponse
    const getResponseData = {
      name: body.name,
      campaign: {
        campaignId: "Z5bnZ",
      },
      email: body.email,
      dayOfCycle: "0",
    };

    const getResponseResponse = await axios.post(
      "https://api.getresponse.com/v3/contacts",
      getResponseData,
      {
        headers: {
          "X-Auth-Token": `api-key ${process.env.GETRESPONSE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    /******Gloogle sheet*/

    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SHEET_KEY_FILE, // Path to your service account key file.
      scopes: ["https://www.googleapis.com/auth/spreadsheets"], // Scope for Google Sheets API.
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: "1Gh8m7B2j3J_u15SiIjruSiDoZdVj3CzTwqNYU0P8n40",
      range: "A1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            body.name,
            body.ciudad,
            body.whatsapp,
            body.edad,
            body.email,
            body.message,
          ],
        ],
      },
    });

    res.status(200).json({
      message:
        "Datos agregados a google sheet correctamente y enviados a get response",
    });
  } catch (error) {
    // Manejo de errores
    //console.error("Error in API handler:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
