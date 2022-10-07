const bcrypt = require("bcryptjs");

const users = [
  {
    username: "Rohit Sharma",
    email: "rohit@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    contact: "8004926259",
    //joiningDate
    department: 1,
    //tasks: ["coding", "writing"],
  },
  {
    username: "Shubh Deo",
    email: "shubh@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    contact: "8004926258",
    //joiningDate
    department: 2,
    //tasks: ["reading"],
  },
  {
    username: "Kartik Mishra",
    email: "kartik@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    contact: "8004926257",
    //joiningDate
    department: 1,
    //tasks: ["developing"],
  },
  {
    username: "Ankit Kumar",
    email: "ankit@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    contact: "8004926256",
    //joiningDate
    department: 1,
    //tasks: ["coding", "reading"],
  },
];

module.exports = users;