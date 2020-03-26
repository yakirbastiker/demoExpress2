let express = require("express");
let app = express();
const port = 3000;


let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true})); //auto body-parser


app.use(express.static("public")); //css dirctory 
app.set("view engine", "ejs"); // to not add .ejs 

app.get("/", (req, res) => {
    // res.send("hi there welcome to my assignment");
    res.render("home");
});

let friends = ['joe', 'poul'];

app.get("/friends", (req, res) => {
    res.render("friends", {friends: friends});
});

app.post("/addfriend", (req, res) => {
    let newFriend = req.body.newfriend;
    friends.push(newFriend); 

    res.redirect("/friends");
});

app.get("/speak/:animal", (req, res) => {
    let sounds = {
        pig: "oink",
        cow: "mooooo",
        dog: "woof woof"
    }
    let animal = req.params.animal.toLowerCase();
    let sound = sounds[animal];
    res.send(`the ${animal} says ${sound}`);
});



app.get("/repeat/:mess/:times", (req, res) => {
    let message = req.params.mess;
    let times = req.params.times;
    let result = "";
    for(let i=0; i < times; i++){
        result+=`${message} `
    }

    res.send(result);
});

app.get("*", (req, res) => {
    res.send("sorry, page not found.");
});

app.listen(port, ()=> console.log(`Example app listening on port ${port}!`));