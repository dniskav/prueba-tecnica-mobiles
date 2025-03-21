import { ProductListItem } from '../../../modules/product/domain/Product'
import { Card } from '../Card/Card'
import styles from './grid.module.css'

export function Grid({ items = [] }: { items: ProductListItem[] }) {
  return (
    <div className={styles.grid}>
      {items.length > 0 && items.map((item) => <Card key={item.id} item={item} />)}
    </div>
  )
}
