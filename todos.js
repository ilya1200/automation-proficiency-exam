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
                console.log(" lastTodoText: " + lastTodoText)
                if (lastTodoText !== todoText) {
                    console.log("The div was deleted")
                }
            }else{
                console.log("The div was deleted")
            }
        } catch (error) {
            console.error(`TodosPage > insertAndDelete(${todoText}) ERROR:`);
            console.error(error);
        }


        //Close Page
        this.closeTodosPage();
    }

    insertAndComplete(todoText) {

    }

    insertTwoDeleteFirst(todoText) {

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


const tdoPg = new TodosPage();
tdoPg.insertAndDelete("Task ABC");