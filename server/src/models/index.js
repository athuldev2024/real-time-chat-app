import { Sequelize, DataTypes } from "sequelize";
import UserModel from "./user-model";
import UploadModel from "./upload-model";
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
  user: UserModel(sequelize, DataTypes),
  upload: UploadModel(sequelize, DataTypes),
};

db.user.hasOne(db.upload, {
  foreignKey: "identifier",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
db.upload.belongsTo(db.user, {
  foreignKey: "identifier",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

export default db;
