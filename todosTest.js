const TodosPage = require("./todos")

async function  testInsertAndDelete(){
    const tdoPg = new TodosPage();
    await tdoPg.insertAndDelete("Task T1");
}

async function  testInsertAndComplete(){
    const tdoPg = new TodosPage();
    await tdoPg.insertAndComplete("Task T2");
}

async function  testInsertTwoDeleteFirst(){
    const tdoPg = new TodosPage();
    await tdoPg.insertTwoDeleteFirst("Task T1","Task T2");
}

/**
 *  Uncomment the test to be run, and comment all others.
 */
async function runTests(){
    // console.log("todosTest testInsertAndDelete()")
    // await testInsertAndDelete();

    // console.log("todosTest testInsertAndComplete()")
    // await testInsertAndComplete();

    console.log("todosTest testInsertTwoDeleteFirst()")
    await testInsertTwoDeleteFirst();
}

runTests()


