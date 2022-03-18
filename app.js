const express = require("express");

const db = require("./data/database");

const authRoutes = require("./router/auth.routes");

const app = express();

app.use(authRoutes);

app.use(express.json());

db.connectToDatabase()
	.then(() => {
		app.listen(3000);
	})
	.catch((err) => {
		console.log("Failed to connect to database: ", err);
	});
