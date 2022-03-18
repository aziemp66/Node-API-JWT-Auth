const User = require("../model/user.model");
const validation = require("../util/validation");

async function register(req, res) {
	//Validating data
	const { error } = validation.registerValidation(req.body);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}

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
