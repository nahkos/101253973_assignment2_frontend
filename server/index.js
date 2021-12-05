import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import  mongoose  from "mongoose";

import employeeRoutes from "./routes/employees.js"

const app = express();
const port = 5000;

//connect to mongoose
mongoose.connect("mongodb+srv://nahkosmurp:LevelMoi@comp3123.srhum.mongodb.net/101253973_assignment2?retryWrites=true&w=majority") 

app.use(bodyParser.json());
app.use(cors());

app.use("/", employeeRoutes);

app.get("/", (req, res) => res.send("Hello From Express"))
app.all("*", (req, res) => res.send("The route you are looking for does not exist"))

app.listen(port, () => console.log(`Server is listening on port: http://localhost:${port}`));