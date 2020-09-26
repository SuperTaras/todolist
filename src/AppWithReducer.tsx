import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./State/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./State/tasks-reducer";


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType

}


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {

    let todolistId1 = v1();
    let todolistId2 = v1();


    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [

        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])


    let [tasks, dispatchToTaskReducer] = useReducer(tasksReducer, {

        [todolistId1]: [
            {id: v1(), title: 'Html&Css', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: true},
        ],

        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true},
            {id: v1(), title: 'tea', isDone: true},
        ]
    })


    function RemoveTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatchToTaskReducer(action)

    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatchToTaskReducer(action)
    }

    function ChangeStatus(taskId: string, isDone: boolean, todolistId: string) {

        const action = changeTaskStatusAC(taskId, isDone, todolistId);
        dispatchToTaskReducer(action)

    }

    function ChangeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(taskId, newTitle, todolistId);
        dispatchToTaskReducer(action)
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = ChangeTodolistFilterAC(todolistId, value);
        dispatchToTodolistsReducer(action)
    }


    function removeTodolist(id: string) {
        const action = RemoveTodolistAC(id);
        dispatchToTaskReducer(action)
        dispatchToTodolistsReducer(action)
    }

    function addTodolist(title: string) {
        const action = AddTodolistAC(title);
        dispatchToTaskReducer(action)
        dispatchToTodolistsReducer(action)

    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const action = ChangeTodolistTitleAC(id, newTitle);
        dispatchToTodolistsReducer(action)

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

export default AppWithReducer;



