import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpann} from "./EditableSpann";


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
            <button onClick={removeTodolist}>X</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(tl => {

                    const onClickHandler = () => props.RemoveTask(tl.id, props.id)
                    const onChangeTitleHandler = (newValue: string) => {
                        props.ChangeTaskTitle(tl.id, newValue, props.id)
                    }


                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.ChangeTaskStatus(tl.id, e.currentTarget.checked, props.id)
                    }


                    return <li key={tl.id} className={tl.isDone ? 'is-done' : ''}>
                        <input type='checkbox' onChange={onChangeStatusHandler} checked={tl.isDone}/>
                        <EditableSpann title={tl.title} onChange={onChangeTitleHandler}/>
                        <button onClick={onClickHandler}
                        > X
                        </button>
                    </li>
                })
            }

        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}> All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}> Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompleteClickHandler}> Completed
            </button>
        </div>

    </div>
}


export default Todolist;