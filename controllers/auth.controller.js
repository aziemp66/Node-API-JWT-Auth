const User = require("../model/user.model");
const validation = require("../util/validation");
const bcrypt = require("bcryptjs");

async function register(req, res) {
	//Validating data
	const { error } = validation.registerValidation(req.body);
	if (error) {
		return res.status(400).json({
			error: error.details[0].message,
		});
	}

	//Checking if user already exists
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) {
		return res.status(400).json({
			error: "Email already exists",
		});
	}

	//Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
	});

	try {
		const savedUser = await user.save();
		res.json({ user: user._id });
	} catch (error) {
		res.status(400).send(error);
	}
}

module.exports = {
	register,
};
