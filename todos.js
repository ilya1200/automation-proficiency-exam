const SeleniumInfra = require("./seleniumInfra");

class TodosPage {
    constructor() {
        this.url = "https://elevation-local-todo.herokuapp.com/";
        this.infraDriver = new SeleniumInfra();
        this.locators = {
            todoInput: {
                locator: "todo-input",
                locatorType: "id"
            },
            addButton: {
                locator: "addToDo",
                locatorType: "id"
            },
            lastTodo: {
                locator: ".todo:last-child",
                locatorType: "css"
            },
            deleteButton: {
                locator: "div.todo>span.delete",
                locatorType: "css"
            },
            checkTodoBtn: {
                locator: "div.todo>i.fa-check-circle",
                locatorType: "css"
            },
            completeTodos: {
                locator: "div.complete>span.text",
                locatorType: "css"
            },
            firstTodo:{
                locator: ".todo:first-child",
                locatorType: "css"
            }
        };
    }


    async insertAndDelete(todoText) {
        //open Page
        await this.openTodosPage();
        try {
            //Insert the todoText into the input field
            const todoInputLocator = this.locators.todoInput;
            await this.infraDriver.write(todoText, todoInputLocator.locatorType, todoInputLocator.locator);


            //Click the “Add” button
            const addButton = this.locators.addButton;
            await this.infraDriver.clickElement(addButton.locatorType, addButton.locator);

            //Pick last todo
            const newTodoLocator = this.locators.lastTodo;
            const isTodoFound = await this.infraDriver.isElementExists(newTodoLocator.locatorType, newTodoLocator.locator);
            let newTodoElem = undefined;

            if (isTodoFound) {
                console.log("found a new div");
                newTodoElem = await this.infraDriver.findElementBy(newTodoLocator.locatorType, newTodoLocator.locator);
                const newTodoText = await this.infraDriver.getTextFromElement(undefined, undefined, newTodoElem);
                if (newTodoText === todoText) {
                    console.log("New div has the same text");
                } else {
                    console.log("Error: New div does not has the same text");
                }
            } else {
                console.log("Error: Can’t find a new div");
            }

            //Click the delete (red) button
            const deleteButtonLocator = this.locators.deleteButton;
            await this.infraDriver.clickElement(deleteButtonLocator.locatorType, deleteButtonLocator.locator, undefined, newTodoElem);


            const isLastTodoFound = await this.infraDriver.isElementExists(newTodoLocator.locatorType, newTodoLocator.locator);
            if (isLastTodoFound) {
                const lastTodoText = await this.infraDriver.getTextFromElement(newTodoLocator.locatorType, newTodoLocator.locator);
                if (lastTodoText !== todoText) {
                    console.log("The div was deleted")
                }else{
                    console.log("The div was not deleted")
                }
            } else {
                console.log("The div was deleted")
            }
        } catch (error) {
            console.error(`TodosPage > insertAndDelete(${todoText}) ERROR:`);
            console.error(error);
        }


        //Close Page
        this.closeTodosPage();
    }

    async insertAndComplete(todoText) {
        //open Page
        await this.openTodosPage();
        try {
            //Insert the todoText into the input field
            const todoInputLocator = this.locators.todoInput;
            await this.infraDriver.write(todoText, todoInputLocator.locatorType, todoInputLocator.locator);


            //Click the “Add” button
            const addButton = this.locators.addButton;
            await this.infraDriver.clickElement(addButton.locatorType, addButton.locator);


            //Pick last todo
            const newTodoLocator = this.locators.lastTodo;
            const isTodoFound = await this.infraDriver.isElementExists(newTodoLocator.locatorType, newTodoLocator.locator);
            let newTodoElem = undefined;

            if (isTodoFound) {
                console.log("found a new div");
                newTodoElem = await this.infraDriver.findElementBy(newTodoLocator.locatorType, newTodoLocator.locator);
            } else {
                console.log("Error: Can’t find a new div");
            }

            //Click the “check” (green) button
            const checkBtnLoc = this.locators.checkTodoBtn;
            await this.infraDriver.clickElement(checkBtnLoc.locatorType, checkBtnLoc.locator, undefined, newTodoElem);

            //Validate if CHECKED
            const completeTodosLoc = this.locators.completeTodos;
            const completeTasksElems = await this.infraDriver.findElementListBy(completeTodosLoc.locatorType, completeTodosLoc.locator);

            for (let completeTaskElm of completeTasksElems) {
                const completeTaskText = await this.infraDriver.getTextFromElement(undefined, undefined, completeTaskElm);
                if (completeTaskText === todoText) {
                    console.log("the new div was checked");

                    //Close Page
                    this.closeTodosPage();
                    return;
                }
            }
            console.log("Error: the new div was NOT checked");
        } catch (error) {
            console.error(`TodosPage > insertAndComplete(${todoText}) ERROR:`);
            console.error(error);
        }


        //Close Page
        this.closeTodosPage();

    }

    async addTask(task){
            //Insert the todoText into the input field
            const todoInputLocator = this.locators.todoInput;
            await this.infraDriver.write(task, todoInputLocator.locatorType, todoInputLocator.locator);

            //Click the “Add” button
            const addButton = this.locators.addButton;
            await this.infraDriver.clickElement(addButton.locatorType, addButton.locator);


            //Pick last todo
            const newTodoLocator = this.locators.lastTodo;
            const isTodoFound = await this.infraDriver.isElementExists(newTodoLocator.locatorType, newTodoLocator.locator);

            if (isTodoFound) {
                console.log("found a new div");
            } else {
                console.log("Error: Can’t find a new div");
            }
    }

    async insertTwoDeleteFirst(todoText1, todoText2) {
        //open Page
        await this.openTodosPage();

        try {
            await this.addTask(todoText1);
            await this.addTask(todoText2);
        
            const firstTodoLoc = this.locators.firstTodo;
            const firstTodoElem = await this.infraDriver.findElementBy(firstTodoLoc.locatorType,firstTodoLoc.locator);
            

            //Click the delete (red) button no first task
            const deleteButtonLocator = this.locators.deleteButton;
            await this.infraDriver.clickElement(deleteButtonLocator.locatorType, deleteButtonLocator.locator, undefined, firstTodoElem);

            //Check first task deleted
            const isFirstTaskExist = await this.infraDriver.isElementExists(firstTodoLoc.locatorType,firstTodoLoc.locator)
            if(isFirstTaskExist){
                const firstTodoElem = await this.infraDriver.findElementBy(firstTodoLoc.locatorType,firstTodoLoc.locator);
                const firstTodoText = await this.infraDriver.getTextFromElement(undefined,undefined,firstTodoElem);            
                
                if(firstTodoText !== todoText1){
                    console.log("the first div was deleted")
                    //Close Page
                    this.closeTodosPage();
                    return;
                }
            }
            console.log("Error: the first div was NOT deleted");

        } catch (error) {
            console.error(`TodosPage > insertTwoDeleteFirst(${todoText1} , ${todoText2}) ERROR:`);
            console.error(error);
        }





        //Close Page
        this.closeTodosPage();
    }

    //Helpers

    async openTodosPage() {
        try {
            await this.infraDriver.getURL(this.url);
        } catch (error) {
            console.error("TodosPage > openTodosPage() FAIL:");
            console.error(error);
        }
    }

    async closeTodosPage() {
        try {
            await this.infraDriver.close();
        } catch (error) {
            console.error("TodosPage > closeTodosPage() FAIL:");
            console.error(error);
        }
    }

}


module.exports = TodosPage;

