const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

const itemSchema = new mongoose.Schema({
    name: String
})

const Item = new mongoose.model("Item", itemSchema);

const item1 = new Item ({
    name: "Welcome to your ToDoList"
})

const item2 = new Item ({
    name: "Hit the + button to add a new item."
})

const item3 = new Item ({
    name: "<-- Hit this to delete an item."
})

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, err => {
    err ? console.log(err) : console.log("Successfully added default items");
})

app.get("/", function(req,res){            
    res.render('list', {listTitle: "Today", newListItems: items})
})

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List", newListItems: workItems})
})

app.post("/", function(req, res){
    const item = req.body.userInput;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item)
        res.redirect("/");
    }
})

app.listen(port, function(){
    console.log("Server is up");
})