require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const connectDb = require("./utils/db");
const errorMiddleware = require("./midddleware/error-middleware");

const authRoute = require("./router/auth-router");

const contactRoute = require("./router/conatct-router");
const serviceRoute=require("./router/service-router");
const adminRoute=require("./router/admin-router");

var corsOptions = {
  origin: "http://localhost:5173",

  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  Credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);
app.use(errorMiddleware);

const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port:${PORT}`);
  });
});
