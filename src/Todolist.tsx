import React, {ChangeEvent, useState, KeyboardEvent} from "react";


export type PropsType = {
    title: string
    tasks: Array<TaskType>
    RemoveTask: (taskId: string) => void
    changeFilter: (value: 'all' | 'active' | 'completed') => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


function Todolist(props: PropsType) {

    let [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    };

    const OnChangehandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }


    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompleteClickHandler = () => props.changeFilter('completed')


    return <div>
        <h3> {props.title}</h3>
        <div>
            <input value={title}
                   onChange={OnChangehandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(tl => {

                    const onClickHandler = () => props.RemoveTask(tl.id)
                    return <li key={tl.id}>
                        <input type='checkbox' checked={tl.isDone}/>
                        <span>{tl.title}</span>
                        <button onClick={onClickHandler}
                        > X
                        </button>
                    </li>
                })
            }

        </ul>
        <div>
            <button onClick={onAllClickHandler}> All
            </button>
            <button onClick={onActiveClickHandler}> Active
            </button>
            <button onClick={onCompleteClickHandler}> Completed
            </button>
        </div>

    </div>
}

export default Todolist;