const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

/**
 * Enable CORS
 */
var corsOptions = { origin: "http://localhost:3015" };
app.use(cors(corsOptions));

/**
 * Parse application/json requests
 */
app.use(bodyParser.json());

/**
 * Parse application/x-www-form-urlencoded requests
 */
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * We create the database based on the model (s)
 */
const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Create oysterdb Database');
});

/**
 * We import the routes
 */
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

/**
 * We listen on port 3010 or the one defined in environment variables
 */
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

/**
 * We validate that the server is running
 */
app.get("/", (req, res) => { res.json({ message: "Express server is running" }) });
