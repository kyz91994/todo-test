import {ChangeEvent} from "react";
import styles from "./input.module.css";

export type InputPropsType = {
    taskTitle: string
    enterTaskTitle: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyPressHandler: (key: string) => void
    addTask: (taskTitle: string) => void
    error: string | null
}
export const Input = ({taskTitle, enterTaskTitle, onKeyPressHandler, addTask, error}: InputPropsType) => {
    return (
        <div className={styles.todoInputContainer}>
            <button onClick={() => addTask(taskTitle)} className={styles.btnPlus}>{'>'} </button>
            <input className={error ? `${styles.todoInput} ${styles.error}` : styles.todoInput}
                   placeholder={error ? error : 'What needs to be done?'}
                   type={'text'}
                   value={taskTitle}
                   onChange={(e) => enterTaskTitle(e)}
                   onKeyPress={(e) => {
                       onKeyPressHandler(e.key)
                   }}/>
        </div>
    )
}