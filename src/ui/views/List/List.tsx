import { useEffect, useState } from 'react'
import { SearchBoxApi } from '../../components'
import { Grid } from '../../components/Grid/Grid'
import { useProductStore } from '../../stores/useProductStore'

export function List() {
  const [filter, setFilter] = useState<string | undefined>()
  const fetchProducts = useProductStore((s) => s.fetchProducts)
  const products = useProductStore((s) => s.products)

  useEffect(() => {
    fetchProducts(filter)
  }, [filter])
  const setQuery = (query: string) => {
    setFilter(query)
  }
  return (
    <>
      <SearchBoxApi quantity={!!filter ? products.length : 0} result={(p: string) => setQuery(p)} />

      <Grid items={products} />
    </>
  )
}
