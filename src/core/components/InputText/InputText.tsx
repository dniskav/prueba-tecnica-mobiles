import styles from './inputText.module.css'

export const InputText = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className={styles['input-wrapper']}>
      <input type="text" {...props} className={styles.input} />
    </div>
  )
}
