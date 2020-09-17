import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";


function App() {


    let [tasks, setTasks] = useState([
        {id: 1, title: 'Html&Css', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'RestApi', isDone: true},

    ]);

    let [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(tl => !tl.isDone)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(tl => tl.isDone)
    }


    function RemoveTask(id: number) {
        let filteredTasks = tasks.filter(tl => tl.id != id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: 'all' | 'active' | 'completed') {
        setFilter(value)
    }


    return (
        <div className="App">
            <Todolist title='What to learn' tasks={tasksForTodolist}
                      RemoveTask={RemoveTask}
                      changeFilter={changeFilter}
            />


        </div>
    );
}

export default App;



