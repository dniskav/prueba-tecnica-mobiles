import { useState } from 'react'
import { Input } from '../../../core/components'
import { ProductListItem } from '../../../modules/product/domain/Product'

export const SearchBox = ({ elements, result }: { elements: any[]; result: any }) => {
  const [total, setTotal] = useState(0)

  /**
   * Filters elements by name and brand. If the query is empty, returns all products.
   * @param {ProductListItem[]} products - Array of products
   * @param {string} query - Search query
   * @returns {ProductListItem[]} - Filtered products
   */
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
    <div>
      <Input
        placeholder="Search for a smartphone..."
        onChange={(e) => filterProducts(e.target.value)}
      />

      <span>{total}</span>
    </div>
  )
}
