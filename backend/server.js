// Load environment variables from a .env file (if it exists)
require("dotenv").config();

// Check if the NODE_ENV environment variable matches a custom CONFIG variable
if (process.env.NODE_ENV == process.env.CONFIG) {
  console.log("##### Running environment: ##### " + process.env.NODE_ENV);
} else {
  // If NODE_ENV doesn't match CONFIG, throw an error
  throw "Invalid .env configuration";
}

// Define a list of required environment variables
const requiredEnvVar = [
  "PORT",
  "MONGO_HOST",
  "MONGO_USERNAME",
  "MONGO_PASSWORD",
  "MONGO_PORT",
  "MONGO_DBNAME",
];

// Filter the required environment variables that are not set
const notSetEnvVar = requiredEnvVar.filter((i) => !process.env[i]);

if (notSetEnvVar.length > 0)
  throw `Required ENV vars not set: ${notSetEnvVar.join(", ")}`;

// Import the Express app
const { app } = require("./app");

// Define the port to listen on, using the PORT environment variable or a default value (10011)
const port = process.env.PORT || 10011;

// Start the Express app and listen on the specified port
app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
