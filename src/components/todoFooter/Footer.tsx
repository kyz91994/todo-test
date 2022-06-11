import {FilterValuesType} from "../todo/Todo";
import styles from "./footer.module.css";

export type FooterPropsType = {
    leftTasks: number
    clearCompletedTasks: () => void
    setFilter: (filter: FilterValuesType) => void
    filter: FilterValuesType
}
export const Footer = ({leftTasks, clearCompletedTasks, setFilter, filter}: FooterPropsType) => {
    const filters: FilterValuesType[] = ['All', 'Active', 'Completed']
    const renderFilterButtons = filters.map((f: FilterValuesType) => {
            return <button className={f === filter ? `${styles.filterBtn} ${styles.active}` : styles.filterBtn}
                           onClick={() => setFilter(f)}>{f}</button>
        }
    )
    return (
        <div className={styles.footer}>
            <span className={styles.amount}>{leftTasks} items left</span>
            {renderFilterButtons}
            <button onClick={clearCompletedTasks} className={styles.filterBtn}>Clear completed</button>
        </div>
    )
}