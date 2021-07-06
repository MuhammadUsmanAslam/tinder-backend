import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";

// app config
const app = express();
const PORT = process.env.PORT || 8001;
const connection_url =
	"mongodb+srv://admin:JAHm7Y1P9hfoUor7@cluster0.nrbhg.mongodb.net/tinderCloneDatabase?retryWrites=true&w=majority";

// Middlewares
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(connection_url, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

// API endpoints
app.get("/", (req, res) => {
	res.status(201).send("Hello Toni");
});

app.post("/tinder/cards", (req, res) => {
	const dbCards = req.body;
	Cards.create(dbCards, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(201).send(data);
		}
	});
});

app.get("/tinder/cards", (req, res) => {
	Cards.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

// Listener
app.listen(PORT, () => {
	console.log(`Server is runing on port: ${PORT}`);
});
