async function getPosts(req, res) {
	res.send(req.user);
}

module.exports = {
	getPosts: getPosts,
};
