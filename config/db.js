const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const connDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Conected");
  } catch (error) {
    console.log("Error");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connDB;
