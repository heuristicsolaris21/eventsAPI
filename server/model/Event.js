const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    "name" : String,
    "date" : String,
    "image" : String,
    "time":String,
    "place":String
}) 

module.exports = mongoose.model("Event", eventSchema);