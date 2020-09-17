import React from "react";

export type PropsType = {
    title:string
    tasks: Array<TaskType>
    RemoveTask: (taskId:number) => void
    changeFilter: (value:'all' | 'active' | 'completed') => void
}

export type TaskType ={
    id:number
    title:string
    isDone :boolean
}






function Todolist(props: PropsType) {
    return <div>
        <h3> {props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {
           props.tasks.map(tl => <li key={tl.id}>
               <input type='checkbox' checked={tl.isDone}/>
               <span>{tl.title}</span>
               <button onClick={() => { props.RemoveTask(tl.id)}}> X </button>
           </li>)
            }

        </ul>
        <div>
            <button onClick={() => {props.changeFilter('all')}}> All</button>
            <button onClick={() => {props.changeFilter('active')}} > Active</button>
            <button onClick={() => {props.changeFilter('completed')}}> Completed</button>
        </div>

    </div>
}

export default Todolist;