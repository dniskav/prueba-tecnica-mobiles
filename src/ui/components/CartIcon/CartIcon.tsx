import cartIcon from '/Bagicon.svg'
import styles from './cartIcon.module.css'
import { useProductContext } from '../../stores/productContext'

export function CartIcon() {
  // Connect to the product context to get cart count
  const { state } = useProductContext()
  const cartCount = state.cart.length

  return (
    <div className={styles.container}>
      <span className={styles.icon}>
        <img src={cartIcon} alt="Cart" />
      </span>

      <span className={styles.badge}>{cartCount}</span>
    </div>
  )
}
