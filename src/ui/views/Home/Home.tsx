import { useEffect, useState } from 'react'
import { Header, SearchBox } from '../../components'
import { fetchProducts } from '../../../modules/product/infrastructure/ProductApi'
import { ProductListItem } from '../../../modules/product/domain/Product'
import { List } from '..'

export function Home() {
  const [products, setProducts] = useState<ProductListItem[]>([])
  const [FilteredProducts, setFilteredProducts] = useState<ProductListItem[]>([])

  useEffect(() => {
    fetchProducts()
      .then((products) => {
        setProducts(products)
        setFilteredProducts(products)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const setGridData = (products: ProductListItem[]) => {
    setFilteredProducts(products)
  }

  return (
    <>
      <Header />

      <SearchBox elements={products} result={(p: ProductListItem) => setGridData(p)} />

      <List items={FilteredProducts} />
    </>
  )
}
