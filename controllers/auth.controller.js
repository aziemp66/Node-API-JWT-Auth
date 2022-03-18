const User = require("../model/user.model");

async function register(req, res) {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});

	try {
		const savedUser = await user.save();
		res.json({ user: user });
	} catch (error) {
		res.status(400).send(error);
	}
}

module.exports = {
	register,
};
