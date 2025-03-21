import { useState } from 'react'
import { InputText } from '../../../core/components'
import { ProductListItem } from '../../../modules/product/domain/Product'
import styles from './searchBox.module.css'

export const SearchBox = ({ elements, result }: { elements: any[]; result: any }) => {
  const [total, setTotal] = useState(0)

  const filterProducts = (query: string): ProductListItem[] => {
    if (!query.trim()) {
      result(elements)
    }

    const lowerCaseQuery = query.toLowerCase()

    const res: ProductListItem[] = elements.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.brand.toLowerCase().includes(lowerCaseQuery)
    )

    result(res.length > 0 ? res : [])
    setTotal(!!query ? res.length : 0)

    return res
  }

  return (
    <div className={styles['search-box']}>
      <InputText
        placeholder="Search for a smartphone..."
        onChange={(e) => filterProducts(e.target.value)}
      />

      <span>{total}</span>
    </div>
  )
}
