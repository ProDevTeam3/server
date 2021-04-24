import cors from "cors";
import express from "express";
import config from "../config.js";
import citizen from "./routes/citizen";
import stats from "./routes/stats";

const app = express();

const corsOptions = {
  origin: ["https://www.prodevteam3.ml", "https://prodevteam3.ml"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/citizen", citizen);
app.use("/stats", stats);

const dbConnData = {
  host: config.mongoHost,
  port: config.mongoPort,
  database: config.mongoDb,
};

// Połączenie z bazą MongoDb

const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then((response) => {
    console.log(
      `Connected to MongoDB. Database name: "${response.connections[0].name}"`
    );
    const port = config.port;
    const host = config.host;
    app.listen(port, () => {
      console.log(`server listening at http://${host}:${port}`);
    });
  })
  .catch((error) => console.error("Error connecting to MongoDB", error));

export default app;
