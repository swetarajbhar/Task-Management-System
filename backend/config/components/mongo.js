const mongoose = require("mongoose");

const { MONGO_HOST, MONGO_USERNAME, MONGO_PASSWORD, MONGO_DBNAME } =
  process.env;

module.exports = {
  bootstrap: async () => {
    try {
      const mongoURI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DBNAME}?retryWrites=true&w=majority`;
      mongoose.set("strictQuery", false);
      await mongoose.connect(mongoURI);
      console.log("Mongo connected");
    } catch (error) {
      console.log(error);
      process.exit();
    }
  },
  config: null,
};
