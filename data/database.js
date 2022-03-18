const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let mongodbUrl =
	"mongodb+srv://default:dummypassword123@mydatabase.g7wpf.mongodb.net/buddyvest?retryWrites=true&w=majority";

let database;

async function connectToDatabase() {
	const client = await MongoClient.connect(mongodbUrl);
	database = client.db("buddyvest");
}

function getDb() {
	if (!database) {
		throw new Error("You must connect first!");
	}

	return database;
}

module.exports = {
	connectToDatabase: connectToDatabase,
	getDb: getDb,
};
