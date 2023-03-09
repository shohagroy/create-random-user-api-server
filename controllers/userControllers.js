const fs = require("fs");
const nextUserId = require("../utils/generateUserId");

module.exports.getRandomUser = (req, res) => {
  fs.readFile("./db/random_user.json", "utf-8", (err, data) => {
    if (err) {
      res.status(403).send("user not found!");
    } else {
      const userData = JSON.parse(data);
      const randomIndex = Math.floor(Math.random() * userData.length);
      const randomUser = userData[randomIndex];
      res.status(200).send(randomUser);
    }
  });
};

module.exports.getAllUser = (req, res) => {
  const { limit } = req.query;

  fs.readFile("./db/random_user.json", "utf-8", (err, data) => {
    if (err) {
      res.status(403).send("users not found!");
    } else {
      const userData = JSON.parse(data);
      res.status(200).send(userData.splice(0, limit));
    }
  });
};

module.exports.postNewUser = (req, res) => {
  const postUser = req.body;

  fs.readFile("./db/random_user.json", "utf-8", (err, data) => {
    if (err) {
      res.status(403).send("users not found!");
    } else {
      if (!data.length) {
        const newUser = JSON.stringify([{ _id: 1, ...postUser }], null, 2);
        console.log(newUser);
        fs.writeFile("./db/random_user.json", newUser, (err) => {
          if (err) {
            res.status(403).send("Filed! can't update user! try agin.");
          } else {
            res.status(200).send("Successfully user added file");
          }
        });
      } else {
        const usersData = JSON.parse(data);
        const _id = nextUserId(usersData);
        const updatedUsers = JSON.stringify(
          [...usersData, { _id, ...postUser }],
          null,
          2
        );
        fs.writeFile("./db/random_user.json", updatedUsers, (err) => {
          if (err) {
            res.status(403).send("Filed! can't update user! try agin.");
          } else {
            res.status(200).send("Successfully user added file");
          }
        });
      }
    }
  });
};
