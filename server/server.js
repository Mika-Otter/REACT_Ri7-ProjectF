import express from "express";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use("/server/auth", authRoutes);

app.listen(8000, () => {
    console.log("Server connection successfull !");
});
