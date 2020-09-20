import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';


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

    function ChangeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(tl => tl.id === taskId);
        if (task) {
            task.title = newTitle;
        }
        setTasks({...tasks});
    }


    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id != id));
        delete tasks[id];
        setTasks({...tasks})
    }


    function addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })

    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
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


                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        changeTodolistTitle={changeTodolistTitle}
                                        ChangeTaskTitle={ChangeTaskTitle}
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
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>


        </div>
    );
}

export default App;



