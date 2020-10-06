const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

let items = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req,res){
    let options = { weekday: 'long', month: 'long', day: 'numeric'};
    let today = new Date();
    let day = today.toLocaleDateString("en-US", options);
        
    res.render('list', {kindOfDay: day, newListItem: items})
})

app.post("/", function(req, res){
    let item = req.body.userInput;
    items.push(item);
    res.redirect("/");
})

app.listen(port, function(){
    console.log("Server is up");
})