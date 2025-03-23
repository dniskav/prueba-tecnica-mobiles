import { useCurrency } from '../../../core/hooks'
import { ProductListItem } from '../../../modules/product/domain/Product'
import styles from './card.module.css'

export function Card({ item }: { item: ProductListItem }) {
  const currencyFormatter = useCurrency('EUR', 'es-ES', 'code')

  return (
    <div className={styles.card}>
      <div className={styles['img-container']}>
        <img src={item.imageUrl} alt={item.name} />
      </div>

      <div className={styles.details}>
        <div className={styles.brand}>{item.brand}</div>
        <div className={styles.refPrice}>
          <span>{item.name}</span>
          <span>{currencyFormatter(item.basePrice)}</span>
        </div>
      </div>
    </div>
  )
}
