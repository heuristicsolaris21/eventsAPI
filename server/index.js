const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Events = require("./model/Event");

const app= express();
app.use(express.json());

app.use(cors());
// app.use(
// 	cors({
// 		// origin: "http://localhost:3000",
// 		origin: "https://kovai-news-api.onrender.com",
// 		methods: "GET,POST,PUT,DELETE",
// 		credentials: true,
// 	})
// );

function getTodayDate() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();

    // Combine components into the desired format
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}


app.post("/addEvent",async(req,res)=>{
    const newEvent = new Events(req.body);
    try {
        const savedEvent = await newEvent.save();
        res.status(200).json(savedEvent);
    } catch (error) {
        res.status(500).json(error);
    }
})

app.get("/getEvents", async (req, res) => {
    const todayDate = getTodayDate();
    try {
        const news = await Events.find();
        res.json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


mongoose.connect(
    "mongodb://shamlinlearning:zJuHgQMxwcKWlB8B@ac-08dhk2y-shard-00-00.n6hxill.mongodb.net:27017,ac-08dhk2y-shard-00-01.n6hxill.mongodb.net:27017,ac-08dhk2y-shard-00-02.n6hxill.mongodb.net:27017/kovaiEvents?ssl=true&replicaSet=atlas-pww4uv-shard-0&authSource=admin&retryWrites=true&w=majority"
    ).then(console.log("Connected to MongoDB !")
);

app.listen(8080, ()=>{
    console.log("Server started at port 8080");
});