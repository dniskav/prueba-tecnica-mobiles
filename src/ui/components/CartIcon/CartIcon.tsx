import cartIcon from '/Bagicon.svg'
import cartIconFilled from '/BagiconF.svg'
import styles from './cartIcon.module.css'
import { useCartContext } from '../../stores/cartContext'

export function CartIcon() {
  const { getTotalItems } = useCartContext()
  const cartCount = getTotalItems()

  const iconToUse = cartCount > 0 ? cartIconFilled : cartIcon

  return (
    <div className={styles.container}>
      <span className={styles.icon}>
        <img src={iconToUse} alt="Cart" />
      </span>

      <span className={styles.badge}>{cartCount}</span>
    </div>
  )
}
