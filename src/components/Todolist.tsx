import {v1} from "uuid";
import {Task, TaskType} from "./Task";
import {ChangeEvent, useState} from "react";


export const Todolist = () => {
    const initialTasks:TaskType[] = [
        {id:v1(), title: 'React', isDone: false},
        {id:v1(), title: 'Redux', isDone: false},
        {id:v1(), title: 'JS', isDone: true},
    ]

    const [tasks, setTasks] = useState<TaskType[]>(initialTasks)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [filter, setFilter] = useState<FilterValuesType>('All')
    const [error, setError] = useState<string|null>('')

    const enterTaskTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTaskTitle(e.currentTarget.value)
    }
    const addTask = (title:string) => {
        if(title) {

            setTasks([{id: v1(), title, isDone: false}, ...tasks])
            setTaskTitle('')
        }else{
            setError('Please, enter title')
        }
    }
    const changeTaskStatus = (status:boolean, taskId:string) => {
        setError(null)
        setTasks(tasks.map((t:TaskType)=> t.id===taskId? {...t, isDone: status}: t))

    }
    const clearCompletedTasks = () => {
        setTasks(tasks.filter((t:TaskType)=> !t.isDone))
    }
    let filteredTasks = tasks
    if(filter === 'Active'){
        filteredTasks = tasks.filter((t:TaskType)=> !t.isDone)
    }
    if(filter === 'Completed'){
        filteredTasks = tasks.filter((t:TaskType)=> t.isDone)
    }
    const tasksForRender = filteredTasks.map((task:TaskType)=> {
        return <Task task={task} changeTaskStatus={changeTaskStatus} setError={setError} error={error}/>
    })
    let leftTasks = tasks.filter((t:TaskType)=> !t.isDone).length

     return(
        <div>
            <div>
                <input placeholder={'What needs to be done?'} type={'text'} value={taskTitle} onChange={(e)=>enterTaskTitle(e)}/>
                <button onClick={()=>addTask(taskTitle)}>Add task</button>
                {error && <div style={{color: 'red'}}>{error}</div>}
            </div>
            <div>
                {tasksForRender}
            </div>
            <div>
                <span>{leftTasks} items left</span>
                <button onClick={()=>setFilter('All')}>All</button>
                <button onClick={()=>setFilter('Active')}>Active</button>
                <button onClick={()=>setFilter('Completed')}>Completed</button>
                <button onClick={clearCompletedTasks}>Clear completed</button>
            </div>


        </div>
    )
}

///types=======
type FilterValuesType = 'All' | 'Completed' | 'Active'