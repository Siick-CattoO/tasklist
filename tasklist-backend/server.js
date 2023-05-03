import express from "express";
import cors from "cors";

// Path / URL:
import path from "path";
import { fileURLToPath } from "url";

// dotenv:
import dotenv from "dotenv";
dotenv.config();

// eigene Imports:
import taskRouter from "./routes/taskRouter.js";

// Datenbank:
import connectDB from "./databases/connectDB.js";

//
// Verbindet den Import mit dem Pfad 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//
// Express-Package wieder aufgreeifen, um es verwenden zu können:
const app = express();

//
// Port festlegen:
// process.env.PORT  ~~>  nimmt die Daten aud der env-Datei
// sollte er keinen Zugriff darauf haben soll der mit der ODER-Methode den Port 5019 ansteuern:
const port = process.env.PORT || 5080;

//
// Probe-Endpunkt:
// app.get("/", (req, res)=>{ res.send("hello")})

app.use(express.json())
app.use(cors());
//
//

app.use("/tasks", taskRouter);

//
//
// Alles was im Bildordner liegt wird ausgeliefert
app.use("/", express.static(path.join(__dirname, "/dist")));

// überprüfe den Pfad:
// console.log(__dirname)

// jeder URL der eingetragen wirdr führt dazu dass die aus dem build-Order
app.get("/*", (req, res)=> res.sendFile(__dirname + "/dist/index.html") )

//
//
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    // wenn DAS geklappt hat sollte mein Server gestartet werden:
    console.log("Verbindung mit MongoDB hat geklappt!");
    app.listen(port, () => {
      console.log("Server läuft auf: ", port);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// //
// // Den Server zum ZUHÖREN bringen:
// app.listen(port, () => {
//   console.log("Server läuft auf: ", port);
// // alternative zum `template literal`:
// // console.log(`Server läuft auf: ${port}`);
// });
