import { ProductListItem } from '../../../modules/product/domain/Product'
import { Grid } from '../../components/Grid/Grid'

export function List({ items }: { items: ProductListItem[] }) {
  return <Grid items={items} />
}
