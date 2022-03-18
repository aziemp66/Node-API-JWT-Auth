const express = require("express");
const dotenv = require("dotenv");

const db = require("./data/database");

const authRoutes = require("./router/auth.routes");
const postRoutes = require("./router/post.routes");

const app = express();
dotenv.config();

app.use(express.json());

app.use(authRoutes);
app.use(postRoutes);

db.connectToDatabase()
	.then(() => {
		app.listen(3000);
	})
	.catch((err) => {
		console.log("Failed to connect to database: ", err);
	});
