import express from "express";
import authRoutes from "./routes/auth.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/server/auth", authRoutes);

app.listen(8080, () => {
    console.log("Server connection successfull on PORT 8080 !");
});
