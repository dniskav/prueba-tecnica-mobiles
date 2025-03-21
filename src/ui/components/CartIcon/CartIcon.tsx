import cartIcon from '/Bagicon.svg'
import styles from './cartIcon.module.css'

export function CartIcon() {
  return (
    <a href="/cart" className={styles.container}>
      <span className={styles.icon}>
        <img src={cartIcon} alt="Cart" />
      </span>

      <span className={styles.badge}>0</span>
    </a>
  )
}
