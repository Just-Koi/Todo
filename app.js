
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {

    res.sendFile(__dirname + '/views/todo.ejs');

    // Welcome
    let getDate = new Date();
    let time = getDate.getUTCHours();
    let timeInPoland = time + 2;
    let welcome = "";

    if(timeInPoland < 10 && timeInPoland >= 4){
        welcome = "Poranny ptaszek";
    } else if(timeInPoland > 10 && timeInPoland < 19){
        welcome = "Dzień dobry";
    } else{
        welcome = "Dobry wieczór"
    }

    //Categories
    let categories = [];
    app.post("/add-category", function(req, res){

        let newCatName = req.body.newCategoryName;
        let newCatDescription = req.body.newCategoryDescription;

        let categoryItem = {
            name: newCatName,
            content: newCatDescription
        }

        console.log(categoryItem);
        categories.push(categoryItem);

        res.redirect("/todo.app");
    });
    console.log(categories);

    res.redirect('/todo.app');

    // render    
    app.get("/todo.app", function(req, res){
        res.render("todo",{
            categories: categories,
            welcome: welcome
        });
    });

});

app.listen(2000, () =>{
    console.log("Express server listening on port 2000 - for local");
});