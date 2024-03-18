import { db } from "../db.js";
import bcrypt from "bcrypt";

export const register = (req, res) => {
    //CHECK EXISTING USER
    const sql = "SELECT * FROM users WHERE email = ? ";

    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("User already exist !"); //409 data already exist

        //Hash the password and create new user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const sql = "INSERT INTO users(`email`,`password`) VALUES (?)";
        const values = [req.body.email, hash];

        db.query(sql, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User added successfully !");
        });
    });
};
export const login = (req, res) => {};
export const logout = (req, res) => {};
