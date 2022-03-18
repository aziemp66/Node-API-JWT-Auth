const router = require("express").Router();

const postsController = require("../controllers/posts.controller");
const verifyTokenMiddleware = require("../middlewares/verifyToken");

router.get("/posts", verifyTokenMiddleware, postsController.getPosts);

module.exports = router;
