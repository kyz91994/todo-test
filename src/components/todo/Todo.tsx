import {v1} from "uuid";
import {Task, TaskType} from "../task/Task";
import {ChangeEvent, useState} from "react";
import {Footer} from "../todoFooter/Footer";
import {Input} from "../todoInput/Input";
import styles from './todo.module.css'


export const Todo = () => {
    const initialTasks: TaskType[] = [
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'JS', isDone: true},
    ]
    const [tasks, setTasks] = useState<TaskType[]>(initialTasks)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [filter, setFilter] = useState<FilterValuesType>('All')
    const [error, setError] = useState<string | null>('')

    const enterTaskTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setError(null)
        setTaskTitle(e.currentTarget.value)
    }
    const addTask = (title: string) => {
        if (title) {
            setTasks([{id: v1(), title, isDone: false}, ...tasks])
            setTaskTitle('')
        } else {
            setError('Please, enter title')
        }
    }
    const changeTaskStatus = (status: boolean, taskId: string) => {
        setError(null)
        setTasks(tasks.map((t: TaskType) => t.id === taskId ? {...t, isDone: status} : t))
    }
    const clearCompletedTasks = () => {
        setTasks(tasks.filter((t: TaskType) => !t.isDone))
    }
    const onKeyPressHandler = (key: string) => {
        if (key === 'Enter') {
            addTask(taskTitle)
        }
    }

    let filteredTasks = tasks
    if (filter === 'Active') {
        filteredTasks = tasks.filter((t: TaskType) => !t.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter((t: TaskType) => t.isDone)
    }
    const tasksForRender = filteredTasks.map((task: TaskType) => {
        return <Task task={task} changeTaskStatus={changeTaskStatus}/>
    })
    let leftTasks = tasks.filter((t: TaskType) => !t.isDone).length


    return (
        <div className={styles.todoContainer}>
            <Input taskTitle={taskTitle}
                   enterTaskTitle={enterTaskTitle}
                   onKeyPressHandler={onKeyPressHandler}
                   addTask={addTask}
                   error={error}
            />
            <ul className={styles.tasksList}>
                {tasksForRender}
            </ul>
            {tasks.length?
                <Footer clearCompletedTasks={clearCompletedTasks} leftTasks={leftTasks}
                        setFilter={setFilter} filter={filter}/>
                : null
                }
        </div>
    )
}
///types=======
export type FilterValuesType = 'All' | 'Completed' | 'Active'