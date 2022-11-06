
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { response } = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Categories
let categories = [];
app.post("/add-category", function(req, res){

    let newCatName = req.body.newCategoryName;
    let newCatDescription = req.body.newCategoryDescription;

    let categoryItem = {
        name: newCatName,
        content: newCatDescription
    }

    if(categoryItem.name === ''){
        res.send('Please enter a name for your category');
    } else if(categoryItem.name === undefined){
        res.send('Please enter a valid name for your category');
    } else{
        categories.push(categoryItem);
        res.redirect("/");
    }

});

//Tasks
let tasks = [];
app.post("/add-task", function(req, res){

    let newTaskName = req.body.newTaskName;
    let newTaskContent = req.body.newTaskDescription;
    let newTaskCategory = req.body.taskCategory;

    let taskItem = {
        name: newTaskName,
        content: newTaskContent,
        category: newTaskCategory
    }

    if(taskItem.name === ''){
        res.send('Please enter a name for your task');
    } else if(taskItem.name === undefined){
        res.send('Please enter a valid name for your task');
    } else{
        tasks.push(taskItem);
        res.redirect("/");
    }

});

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
        welcome = "Dobry wieczór";
    }


    // render    
    res.render("todo",{
        welcome: welcome,
        categories: categories,
        tasks: tasks
    })

});

app.listen(2000, () =>{
    console.log("Express server listening on port 2000 - for local");
});