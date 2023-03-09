const fs = require("fs");

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
      res.status(200).send(limit ? userData.splice(0, limit) : userData);
    }
  });
};

module.exports.postNewUser = (req, res) => {
  const { id, gender, name, contact, address, photoUrl } = req.body;

  if (id && gender && name && contact && address && photoUrl) {
    fs.readFile("./db/random_user.json", "utf-8", (err, data) => {
      if (err) {
        res.status(403).send("users not found!");
      } else {
        if (!data.length) {
          const newUser = JSON.stringify(
            [{ id, gender, name, contact, address, photoUrl }],
            null,
            2
          );
          fs.writeFile("./db/random_user.json", newUser, (err) => {
            if (err) {
              res.status(403).send("Filed! can't update user! try agin.");
            } else {
              res.status(200).send("Successfully user added!");
            }
          });
        } else {
          const usersData = JSON.parse(data);

          const updatedUsers = JSON.stringify(
            [...usersData, { id, gender, name, contact, address, photoUrl }],
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
  } else {
    res.status(403).send("Filed! user properties are missing!");
  }
};

module.exports.patchUserUpdate = (req, res) => {
  const updatedData = req.body;
  const { id } = req.params;

  if (!isNaN(id)) {
    fs.readFile("./db/random_user.json", "utf-8", (err, data) => {
      if (err) {
        res.status(403).send("user not found!");
      } else {
        const usersData = JSON.parse(data);

        const existing = usersData.find((user) => user.id === parseInt(id));

        if (!existing) {
          res.status(403).send("user not found");
        } else {
          const updatedUsers = usersData.map((user) => {
            if (user.id === parseInt(id)) {
              return { ...user, ...updatedData };
            }
            return user;
          });

          fs.writeFile(
            "./db/random_user.json",
            JSON.stringify(updatedUsers, null, 2),
            (err) => {
              if (err) {
                res.status(403).send("Filed! can't update user! try agin.");
              } else {
                res.status(200).send("Successfully user added file");
              }
            }
          );
        }
      }
    });
  } else {
    res.status(403).send("Filed! please provide correct id");
  }
};

module.exports.patchBulkUserUpdate = (req, res) => {
  const updatedUsers = req.body;

  fs.readFile("./db/random_user.json", "utf-8", (err, data) => {
    if (err) {
      res.status(403).send("faild! can't read users data.");
    } else {
      if (!data) {
        res.status(200).send("no user found!");
      } else {
        const parseData = JSON.parse(data);

        let success = 0;
        let failed = 0;

        updatedUsers.forEach((updateData) => {
          const updateUser = parseData.find(
            (user) => user.id === updateData.id
          );

          const remainUser = parseData.filter(
            (user) => user.id !== updateData.id
          );

          if (updateUser?.id) {
            const update = { ...updateUser, ...updateData };
            const isUpdated = JSON.stringify(
              [...remainUser, update].sort((a, b) => a.id - b.id),
              null,
              2
            );
            try {
              fs.writeFileSync("./db/random_user.json", isUpdated, {
                encoding: "utf8",
              });
              success++;
            } catch (error) {
              failed++;
            }
          } else {
            failed++;
          }
        });
        res.status(200).send(`update success: ${success}, failed: ${failed}`);
      }
    }
  });
};

module.exports.deletedUser = (req, res) => {
  const { id } = req.body;

  if (!isNaN(id)) {
    fs.readFile("./db/random_user.json", "utf-8", (err, data) => {
      if (err) {
        res.status(403).send("failed! cant't read user data!");
      } else {
        const usersData = JSON.parse(data);

        const remainUser = usersData.filter((user) => user.id !== parseInt(id));
        const user = usersData.find((user) => user.id === parseInt(id));

        if (user) {
          fs.writeFile(
            "./db/random_user.json",
            JSON.stringify(remainUser, null, 2),
            (err) => {
              if (err) {
                res.status(403).send("Filed! can't delete user! try agin.");
              } else {
                res.status(200).send("Successfully! user delete!");
              }
            }
          );
        } else {
          res.status(403).send("user not found");
        }
      }
    });
  } else {
    res.status(403).send("Filed! please provide correct id");
  }
};

// [
//   {
//     "id": 1,
//     "gender": "male",
//     "name": "Shohag roy",
//     "contact": "000",
//     "address": "mahignaj",
//     "photoUrl": "photourl"
//   },
//   {
//     "id": 2,
//     "gender": "male",
//     "name": "New roy",
//     "contact": "000",
//     "address": "mahignaj",
//     "photoUrl": "photourl"
//   },
//   {
//     "id": 3,
//     "gender": "male",
//     "name": "rabi roy",
//     "contact": "000",
//     "address": "mahignaj",
//     "photoUrl": "photourl"
//   },
//   {
//     "id": 4,
//     "gender": "male",
//     "name": "shadin roy",
//     "contact": "000",
//     "address": "mahignaj",
//     "photoUrl": "photourl"
//   }
// ]
