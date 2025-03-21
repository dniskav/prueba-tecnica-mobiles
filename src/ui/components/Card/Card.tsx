import { ProductListItem } from '../../../modules/product/domain/Product'
import styles from './card.module.css'

export function Card({ item }: { item: ProductListItem }) {
  return (
    <div className={styles.card}>
      <div className={styles['img-container']}>
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <div className={styles.brand}>{item.brand}</div>
      <div className={styles.details}>
        <span>{item.name}</span>
        <span>{item.basePrice}</span>
      </div>
    </div>
  )
}
