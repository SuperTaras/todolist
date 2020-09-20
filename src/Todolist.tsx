import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpann} from "./EditableSpann";
import {Delete} from "@material-ui/icons";
import {Button, Checkbox, IconButton} from "@material-ui/core";


export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    RemoveTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    ChangeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    ChangeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void


}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


function Todolist(props: PropsType) {


    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompleteClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }


    return <div>
        <h3><EditableSpann title={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                props.tasks.map(tl => {

                    const onClickHandler = () => props.RemoveTask(tl.id, props.id)
                    const onChangeTitleHandler = (newValue: string) => {
                        props.ChangeTaskTitle(tl.id, newValue, props.id)
                    }


                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.ChangeTaskStatus(tl.id, e.currentTarget.checked, props.id)
                    }


                    return <div key={tl.id} className={tl.isDone ? 'is-done' : ''}>
                        <Checkbox onChange={onChangeStatusHandler} checked={tl.isDone}/>
                        <EditableSpann title={tl.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }

        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}
                    color={"primary"}
            > All
            </Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}
                    color={"secondary"}

            > Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompleteClickHandler}
                    color={"inherit"}
            > Completed
            </Button>
        </div>

    </div>
}


export default Todolist;