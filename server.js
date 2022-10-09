const express = require("express");
const dotenv = require("dotenv");
const { loginRouter } = require("./routes/loginRoutes");
const { taskRouter } = require("./routes/taskRoutes");
const { userRouter } = require("./routes/userRoutes");
const connectDB = require("./config/db");
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

//connect db
connectDB();

const PORT = process.env.PORT || 8800;

app.use("/api/login", loginRouter);
app.use("/api/task", taskRouter);
app.use("/api/user", userRouter);

app.listen(PORT, console.log(`Server started on port ${PORT}`));
