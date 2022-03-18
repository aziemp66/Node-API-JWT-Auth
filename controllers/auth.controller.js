function register(req, res) {
	res.status(201).json({
		message: "User registered successfully!",
	});
}

module.exports = {
	register,
};
