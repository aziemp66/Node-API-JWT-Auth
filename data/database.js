const mongoose = require("mongoose");
const dotenv = require("dotenv");

let mongodbUrl = "mongodb://localhost:27017";

async function connectToDatabase() {
	dotenv.config();

	if (process.env.DB_CONNECT) {
		mongodbUrl = process.env.DB_CONNECT;
	}
	mongoose.connect(
		mongodbUrl,
		{
			useNewUrlParser: true,
		},
		() => console.log("Connected to database")
	);
}

module.exports = {
	connectToDatabase: connectToDatabase,
};
