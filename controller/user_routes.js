import express from "express";
import { User } from "../model/model";
import jwt from "jsonwebtoken";
import { hashPassword } from "../services/hash_service";

const user = express.Router();

//routing
user.get("/", (req, res) => {
  res.send("berhasil terkonek ke server");
});

//USER_REGISTER
user.post("/user_register", (req, res) => {
  //kita tangkap data body nya
  let { username, password } = req.body;

  //masukan data ke database
  User.create({
    username: username,
    password: hashPassword(password),
  })
    .then((result) => {
      //validatiion
      if (result) {
        res.json({
          success: true,
          msg: "data berhasil di tambahkan",
        });
      } else {
        res.json({
          success: false,
          msg: "gagal menambahkan data",
        });

        return;
      }
    })
    .catch((err) => {
      res.json({
        success: false,
        msg: "gagal menambahkan data",
        error: err.message,
      });
    });
});

// USER LOGIN
user.post("/user_login", (req, res) => {
  let { username, password } = req.body;

  //check apakah username dan password benar
  User.findOne({
    where: {
      username: username,
      password: password,
    },
  })
    .then((result) => {
      //kondisi ketika login berhasil
      if (result) {
        res.json({
          success: true,
          msg: "login berhasil",
          token: jwt.sign(
            {
              app_id: "1qazxsw2",
              app_name: "belajar auth",
              username: username,
            },
            "1qazxsw23edcvfr45tgbnhy6"
          ),
        });
      } else {
        res.json({
          success: false,
          msg: "data tidak ditemukan",
        });

        return;
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// READ ALL DATA
user.get("/user_read_all", (req, res) => {
  User.findAll()
    .then((result) => {
      res.json({
        success: true,
        query: result,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        error: err.message,
      });
    });
});

export default user;
