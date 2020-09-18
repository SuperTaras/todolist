import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType


}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();


    let [todolists, setTodolists] = useState<Array<TodolistType>>([

        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])





    let [tasks, setTasks] = useState({

        [todolistId1]: [
            {id: v1(), title: 'Html&Css', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
        ],

        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true},
        ]
    })


    function RemoveTask(id: string, todolistId: string) {

        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(tl => tl.id != id)
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }

    }


    function addTask(title: string, todolistId: string) {

        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks});
    }


    function ChangeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId];

        let task = todolistTasks.find(tl => tl.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks});
    }


    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id != id));
        delete tasks[id];
        setTasks({...tasks})
    }


    return (
        <div className="App">
            {
                todolists.map(tl => {

                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === 'active') {
                        tasksForTodolist = allTodolistTasks.filter(tl => !tl.isDone)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = allTodolistTasks.filter(tl => tl.isDone)
                    }


                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        RemoveTask={RemoveTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        ChangeTaskStatus={ChangeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            } 


        </div>
    );
}

export default App;



