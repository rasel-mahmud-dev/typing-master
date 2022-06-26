const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require("cors")
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require("mongoose");

// const d = require("../src/lessons.js")


require("dotenv").config()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



const Category= mongoose.model("Category", new mongoose.Schema({
	label: { type: String, index: true, unique: true }
}, { timestamps: true }))


const Lessons = mongoose.model("Lesson", new mongoose.Schema({
	label: { type: String, unique: true },
	text: { type: String },
	type: String,
	categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", index: true }
}, { timestamps: true }))


const whitelist = [process.env.FRONTEND]
const corsOptions = {
	credentials: true,
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			if(process.env.NODE_ENV === "development"){
				callback(null, true) // anyone can access this apis when is development mode
			} else {
				callback(null, {origin: false }) // anyone can access this apis
				// callback(new Error('Not allowed by CORS'))
			}
		}
	}
}

app.use(cors(corsOptions))

const router = express.Router();

app.post("/lessons", async function (req, res){
		res.setHeader("Content-Type", "application/json")
		let lessons = await Lessons.find({categoryId: req.body.catId}).populate("categoryId");
		res.send(lessons)
	})

	app.get("/categories", async function (req, res){
		res.setHeader("Content-Type", "application/json")
		let category = await Category.find();
		res.send(category)
	})

	router.get("/add-category", async function (req, res){
		// let a  = d.lessons.map(l=>{
		// 	return {
		// 		label: l.label
		// 	}
		// })
		//
		// let a = d.lessons[6].items.map(i=>{
		// 	return {
		// 		label: i.label,
		// 		text: i.text,
		// 		type: i.type ? i.type: "",
		// 		categoryId: "62b83275a8ef9f3faf8b3b06"
		// 	}
		// })

		try {
			
			// let result = await Lessons.insertMany(a)
			// console.log(result)
			
			// let s = await Lessons.deleteMany({categoryId: "62b83275a8ef9f3faf8b3b04"})
			// console.log(s)
			
			// let result = await Lessons.insertMany(a)
			// console.log(result)
			
		}catch (ex){
			console.log(ex)
		}
		
		// let doc = await Category.insertMany(a)
		// console.log(doc)
		// res.setHeader("Content-Type", "application/json")
		// res.json([{"name": "SADDDDDDD"}])
	})

	app.get("/", function (req, res){
		res.send("with app v3")
	})
	
	// /.netlify/functions
	router.get("/", function (req, res){
		res.send("router app v3")
	})




app.use(bodyParser.json());
app.use('/.netlify/functions/api', router);  // path must route to lambda


mongoose.connect(process.env.MONGO_DB_URI).then(res=>{
	console.log("mongodb connected")
}).catch(ex=>{
		console.log(ex)
})

if(process.env.NODE_ENV === "development"){
	app.listen(8888)
}


module.exports = app;
module.exports.handler = serverless(app);

