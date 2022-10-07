const express = require('express');
const dotenv = require('dotenv');


const app = express();


app.use(express.json()); 
dotenv.config()


const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));