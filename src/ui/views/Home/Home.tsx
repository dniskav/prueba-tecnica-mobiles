import { useEffect, useState } from 'react'
import { Header, SearchBox } from '../../components'
import { fetchProducts } from '../../../modules/product/infrastructure/ProductApi'
import { ProductListItem } from '../../../modules/product/domain/Product'

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

  return (
    <>
      <Header />
      <section className="searchBox">
        <SearchBox elements={products} result={(p) => setFilteredProducts(p)} />
      </section>
      {JSON.stringify(FilteredProducts)}
      {/* content here */}
    </>
  )
}
