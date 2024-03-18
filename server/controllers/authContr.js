import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    //CHECK EXISTING USER
    const sql = "SELECT * FROM users WHERE email = ? ";

    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("This e-mail already exist !"); //409 data already exist

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
export const login = (req, res) => {
    //CHECK USER
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not found.");

        //check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if (!isPasswordCorrect) return res.status(400).json("Wrong email or password.");

        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        const { password, ...other } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json(other);
    });
};
export const logout = (req, res) => {};
