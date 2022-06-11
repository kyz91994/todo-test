import styles from './task.module.css'

export const Task = ({task,changeTaskStatus }:TasksPropsType) => {

    const changeTasksStatusCallBack = (status: boolean) => {
        changeTaskStatus(status, task.id)
    }
    return(
        <li className={styles.task}>
            <input  className={styles.checkbox}  type={"checkbox"} checked={task.isDone} onChange={(e)=>changeTasksStatusCallBack(e.currentTarget.checked)}/>
            <span className={task.isDone? `${styles.completed} ${styles.text}`: styles.text}>{task.title}</span>
        </li>
        )
}
//types=====
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksPropsType = {
    task: TaskType
    changeTaskStatus: (status:boolean,taskId: string) => void
}