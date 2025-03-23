import { useEffect, useState } from 'react'
import { Header, SearchBoxApi } from '../../components'
import { ProductListItem } from '../../../modules/product/domain/Product'
import { List } from '..'
import { useProductStore } from '../../stores/useProductStore'

export function Home() {
  const fetchProducts = useProductStore((s) => s.fetchProducts)
  const [filter, setFilter] = useState<string | undefined>()
  const products = useProductStore((s) => s.products)
  const loading = useProductStore((s) => s.loading)
  const error = useProductStore((s) => s.error)

  useEffect(() => {
    fetchProducts(filter)
  }, [filter])

  const setQuery = (query: string) => {
    setFilter(query)
  }

  return (
    <>
      <Header />

      <SearchBoxApi
        quantity={!!filter ? products.length : 0}
        result={(p: ProductListItem) => setQuery(p)}
      />

      <List items={products} />
    </>
  )
}
