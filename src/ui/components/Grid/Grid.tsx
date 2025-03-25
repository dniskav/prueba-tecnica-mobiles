import { Link } from 'react-router-dom'
import { ProductListItem } from '../../../modules/product/domain/Product'
import { Card } from '../Card/Card'
import styles from './grid.module.css'

export function Grid({ items = [] }: { items: ProductListItem[] }) {
  return (
    <div className={styles.grid}>
      {items.length > 0 &&
        items.map((item) => (
          <Link to={`/detail/${item.id}`} key={item.id + item.brand}>
            <Card key={item.id + item.brand} item={item} />
          </Link>
        ))}
    </div>
  )
}
