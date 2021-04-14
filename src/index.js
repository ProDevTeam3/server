import cors from "cors";
import express from "express";
import config from "../config.js";
import citizen from "./routes/citizen";
import contract from "./routes/contract";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/citizen", citizen);
app.use("/contract", contract);

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
