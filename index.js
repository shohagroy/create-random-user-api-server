const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/users.route");

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.status(200).send("random user api servr running..");
});

app.all("*", (req, res) => {
  res.status(403).send("No Route Found!");
});

app.listen(port, () => {
  console.log(`random user api is running port: ${port}`);
});

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
