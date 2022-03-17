const express = require("express");

const authRoutes = require("./router/auth.routes");

const app = express();

app.use(authRoutes);

app.use(express.json());

//listen on port 3000
app.listen(3000, () => {
	console.log("Server is running on port 3000");
});
