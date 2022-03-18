const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/user.model");
const validation = require("../util/validation");

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
		email: req.body.email.toLowerCase(),
		password: hashedPassword,
	});

	try {
		const savedUser = await user.save();
		res.json({ user: user._id });
	} catch (error) {
		return res.status(400).json({
			error: error,
		});
	}
}

async function login(req, res) {
	//Validating data
	const { error } = validation.loginValidation(req.body);
	if (error) {
		return res.status(400).json({
			error: error.details[0].message,
		});
	}

	//Checking if user exists
	const userFound = await User.findOne({ email: req.body.email });
	if (!userFound) {
		return res.status(400).json({
			error: "Email or password is incorrect",
		});
	}

	//Password is Correct
	const validPassword = await bcrypt.compare(
		req.body.password,
		userFound.password
	);
	if (!validPassword) {
		return res.status(400).json({
			error: "Email or password is incorrect",
		});
	}

	//Create and assign a token
	const token = jwt.sign({ _id: userFound._id }, process.env.TOKEN_SECRET);
	res.header("auth-token", token).json({
		token: token,
		user: userFound._id,
	});
}

module.exports = {
	register,
	login,
};
