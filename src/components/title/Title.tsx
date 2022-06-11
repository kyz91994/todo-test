import styles from './title.module.css'
export const Title = (props:any) => {
    return(
        <h1 className={styles.title}>{props.title}</h1>
    )
}