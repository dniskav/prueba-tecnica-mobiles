import { useEffect, useState } from 'react'
import { Header, SearchBoxApi } from '../../components'
import { fetchProducts } from '../../../modules/product/infrastructure/ProductApi'
import { ProductListItem } from '../../../modules/product/domain/Product'
import { List } from '..'

export function Home() {
  const [products, setProducts] = useState<ProductListItem[]>([])
  const [filter, setFilter] = useState<string | undefined>()

  useEffect(() => {
    fetchProducts(filter)
      .then((products) => {
        setProducts(products)
      })
      .catch((error) => {
        console.error(error)
      })
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
