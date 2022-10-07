const express = require("express");
const dotenv = require("dotenv");
const loginRoute = require("./routes/login");

const app = express();

app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 8800;

app.use("/login", loginRoute);

app.listen(PORT, console.log(`Server started on port ${PORT}`));
