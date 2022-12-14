$(document).ready(function(){

    // open and close add category screen
    let categoryScreen = $('#categoryScreen');
    let addCategoryScreen = $('#addCategory');
    let deleteCategoryScreen = $('#deleteCategory');
    let closeCategoryScreen = $('#closeCategoryScreen');

    addCategoryScreen.click(() => {
        categoryScreen.css('transform', 'scale(1)');
    });

    deleteCategoryScreen.click(() => {
        categoryScreen.css('transform', 'scale(1)');
    });

    closeCategoryScreen.click( () => {
        categoryScreen.css('transform', 'scale(0)');
    });

    // open and close add new task screen
    let taskScreen = $('#taskScreen');
    let addTaskButton = $('#addTaskButton');
    let closeTaskScreen = $('#closeTaskScreen');

    addTaskButton.click(() => {
        taskScreen.css('transform', 'scale(1)');
    });

    closeTaskScreen.click(() => {
        taskScreen.css('transform', 'scale(0)');
    });

});