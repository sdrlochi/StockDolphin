const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const supplierRoutes = require("./routes/supplierRoute");
const itemRoute = require('./routes/itemRoute');

const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening at ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));

// app.use("/auth", AuthRoute);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use('/api/items', itemRoute);

// //ceated a route path
// app.use("/api/users", userRoutes);
// app.use("/api/notes", noteRoutes);

//import errorMiddleware file in server.

// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, console.log(`Server started on PORT ${process.env.PORT}`));
