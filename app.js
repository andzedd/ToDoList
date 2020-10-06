const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();
const port = 3000;

let items = [];
let workItems = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req,res){
            
    res.render('list', {listTitle: date(), newListItems: items})
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