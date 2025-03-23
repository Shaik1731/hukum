const TaskManager=(function(){
    let tasks=[]
    let  taskID=101
    return {
        addTask(title){
            tasks.push({id:taskID ++ ,title,completed:false});
        },
        getAllTasks(){
            return JSON.stringify(tasks,null,2);
        },
        markComplete(taskID){
            task=tasks.map(task => task.id ==taskID  ? {...task,completed :true} :task)
        },
        removeTask(taskID){
            task=tasks.filter(task => task.id !== taskID);
        },
        getPendingTask(){
            return task.filter(task => !task.completed).map(task =>task.title);
        },
        getCompletedTasks(){
            return tasks.filter(task => task.completed).map(task =>task.title);

        },
        sortTasks(){
            return tasks
              .slice()
              .sort((a,b)=>a.title.localeCompare(b.title))
              .map(task => task.title);
        }
    }
})();
TaskManager.addTask("playing cricket");
TaskManager.addTask("Reading Books")
TaskManager.addTask("watching movie");
TaskManager.markComplete(2);

console.log("All Tasks", TaskManager.getAllTasks())
console.log("pending Task",TaskManager.getPendingTask())
console.log("completed Tasks",TaskManager.getCompletedTasks())
console.log("sorted Tasks",TaskManager.sortTasks())