export const Task = ({task,changeTaskStatus,setError, error }:TasksPropsType) => {

    const changeTasksStatusCallBack = (status: boolean) => {
        changeTaskStatus(status, task.id)
    }
    return(
        <div>
            <input type='checkbox' checked={task.isDone} onChange={(e)=>changeTasksStatusCallBack(e.currentTarget.checked)}/>
            <span>{task.title}</span>

        </div>
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
    setError:(error: string)=> void
    error: string | null
}