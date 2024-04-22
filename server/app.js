import express from "express";
import http from "http";
import cors from "cors";
import routes from "./src/routes";
import bodyParser from "body-parser";
import "dotenv/config";
import db from "@models";

const app = express();
const server = http.createServer(app);
const PORT = process.env.API_PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/", routes);

db.sequelize
  .sync()
  .then(() => {
    console.log("Sync success");
  })
  .catch((error) => {
    console.error("Sync failure ", error);
  });

server.listen(PORT, () => {
  console.log(`Server running in PORT: ${PORT}`);
});
