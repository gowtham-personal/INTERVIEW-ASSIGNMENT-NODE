const bcrypt = require("bcrypt");
// const db = require("../models/index");

const users = [
  {
    id: 1,
    userName: "spiderman",
    password: "$2y$06$bD1NjIbJGp8MnNzhXvekxe29cd95m2hxxKm4GDmpxzgXp7e4LmlwO",
    email: "srijaravi@gmail.com"
  },
  {
    id: 2,
    userName: "peter",
    password: "paul",
    email: "peter@gmail.com"
  },
  {
    id: 3,
    userName: "harry potter",
    password: "sdsd",
    email: "laksha@gmail.com"
  }
];

// Get user by userName and password.
exports.getUserlogin = (req, res) => {
  const userDetails = users.find(user => user.userName === req.query.userName);
  if (!userDetails) return res.status(404).send("user is not found");
  if (
    req.query.password &&
    bcrypt.compareSync(req.query.password, userDetails.password)
  ) {
    return res.send(userDetails);
  } else {
    res.status(404).send("Your password is wrong");
  }
};

// Add a user to the list
exports.addUsers = (req, res) => {
  const existingUser = users.find(user => user.userName === req.body.userName);
  if (!existingUser) {
    //Validate fields
    if (!req.body.userName || !req.body.password) {
      return res.status(400).send("Name and password field is required");
    }
    bcrypt.hash(req.body.password, 6, function(err, hashedPassword) {
      const user = {
        id: users.length + 1,
        userName: req.body.userName,
        password: hashedPassword,
        email: req.body.email ? req.body.email : ""
      };
      users.push(user);
      return res.send({
        status: "success",
        code: 200,
        user
      });
    });
  } else {
    return res.status(400).send("User already exists");
  }
};
