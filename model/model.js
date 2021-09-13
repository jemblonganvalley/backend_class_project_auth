import sq from "./connection";
import { DataTypes } from "sequelize";

//kita buat table user
export const User = sq.define("user", {
  // kita buat column username
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  // kita buat column password
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
