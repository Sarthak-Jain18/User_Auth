const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute.js");
const { MONGO_URL } = process.env;

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("MongoDB is connected successfully");
        app.listen(8080, () => {
            console.log("Server is listening on port 8080");
        });
    })
    .catch((err) => console.error("MongoDB connection failed:", err));

app.use(cors({
    origin: ["https://user-auth-mu-two.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);


