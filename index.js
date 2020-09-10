const express = require("express");
const connDB = require("./config/db");

const app = express();

connDB();

const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running in port: ${port}`);
});
