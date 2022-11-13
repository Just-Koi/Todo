
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

    console.log(categoryItem);

    if(categoryItem.name === ''){
        res.send('Please enter a name for your category');
    } else if(categoryItem.name === undefined){
        res.send('Please enter a valid name for your category');
    } else{
        categories.push(categoryItem);
        res.redirect("/");
    }

});

// Validate category

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

    //validate category of task
    console.log(taskItem);

    if(taskItem.name === ''){
        res.send('Please enter a name for your task');
    } else if(taskItem.name === undefined){
        res.send('Please enter a valid name for your task');
    } else if(taskItem.category === '' || taskItem.category === undefined){
        res.send('Please select a valid category for your task');
    }else{
        tasks.push(taskItem);
        res.redirect("/validating-task");
    }

});

// Validate Task
let validatedTasks = [];
app.get('/validating-task', function(req, res){

    let taskCategory = tasks[tasks.length - 1].category;
    let categoryName = categories[categories.length - 1].name;
    let searchForCategoryName;

    console.log(taskCategory, categoryName);

    let validatedTask = {
        name: taskCategory,
        category: categoryName
    }

    console.log(validatedTask, validatedTasks);

    if (taskCategory === categoryName){
        validatedTasks.push(validatedTask);
        res.redirect("/");
    } else {
        let i = 0;
        while(i < categories.length){
            searchForCategoryName = categories[categories.length - i].name;
            i--;

            if(searchForCategoryName === taskCategory){
                console.log('Founded! ' + taskCategory + ' is equal to ' + searchForCategoryName);
            }
        }
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
        tasks: validatedTasks
    })

});

app.listen(2000, () =>{
    console.log("Express server listening on port 2000 - for local");
});