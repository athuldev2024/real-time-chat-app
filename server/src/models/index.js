import { Sequelize, DataTypes } from "sequelize";
import UserModal from "./user-model";
import messages from "@constants/message";
import "dotenv/config";

const sequelize = new Sequelize(
  "chat",
  process.env.SQL_USERNAME,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_HOST,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(messages.SQL_DB_CONNECTION_SUCCESS);
  })
  .catch((error) => {
    console.log(messages.SQL_DB_CONNECTION_FAILURE, error);
  });

const db = {
  sequelize,
  user: UserModal(sequelize, DataTypes),
};

export default db;
