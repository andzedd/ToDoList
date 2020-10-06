const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

let items = [];
let workItems = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req,res){
    let options = { weekday: 'long', month: 'long', day: 'numeric'};
    let today = new Date();
    let day = today.toLocaleDateString("en-US", options);
        
    res.render('list', {listTitle: day, newListItems: items})
})

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List", newListItems: workItems})
})

app.post("/", function(req, res){
    let item = req.body.userInput;
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