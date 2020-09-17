import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";


function App() {


    let [tasks, setTasks] = useState([
        {id: v1(), title: 'Html&Css', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'RestApi', isDone: true},

    ]);

    let [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(tl => !tl.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(tl => tl.isDone)
    }


    function RemoveTask(id: string) {
        let filteredTasks = tasks.filter(tl => tl.id != id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: 'all' | 'active' | 'completed') {
        setFilter(value)
    }


    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }


    return (
        <div className="App">
            <Todolist title='What to learn' tasks={tasksForTodolist}
                      RemoveTask={RemoveTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />


        </div>
    );
}

export default App;



