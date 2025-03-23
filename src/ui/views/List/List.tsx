import { Grid } from '../../components/Grid/Grid'
import { useProductStore } from '../../stores/useProductStore'

export function List() {
  const products = useProductStore((s) => s.products)
  return <Grid items={products} />
}
