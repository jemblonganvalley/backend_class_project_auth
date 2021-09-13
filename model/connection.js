import { Sequelize } from "sequelize";
import path from "path";

const sq = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../db.sqlite"),
});

export default sq;
