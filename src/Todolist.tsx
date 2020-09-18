import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";


export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    RemoveTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    ChangeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void


}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.id)
            setTitle('')
        } else {
            setError('Title is required')
        }
    };

    const OnChangehandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }


    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompleteClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }

    return <div>
        <h3> {props.title}
            <button onClick={removeTodolist}>X</button>
        </h3>
        <div>
            <input value={title}
                   onChange={OnChangehandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(tl => {

                    const onClickHandler = () => props.RemoveTask(tl.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.ChangeTaskStatus(tl.id, e.currentTarget.checked, props.id)
                    }
                    return <li key={tl.id} className={tl.isDone ? 'is-done' : ''}>
                        <input type='checkbox' onChange={onChangeHandler} checked={tl.isDone}/>
                        <span>{tl.title}</span>
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