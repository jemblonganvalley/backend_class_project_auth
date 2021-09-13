import express from "express";
import sq from "./model/connection";
import { User } from "./model/model";
import jwt from "jsonwebtoken";
import user from "./controller/user_routes";

const app = express();

//middleware
app.use(express.json());

//connection ke database
sq.sync({ force: true }).then((result) => {
  console.log("database berhasil konek");
});

//middleware routes
app.use("/api", user);

app.listen(9000, () => {
  console.log("server berjalan di port 9000");
});
