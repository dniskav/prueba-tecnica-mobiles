import { InputText } from '../../../core/components'
import styles from './searchBox.module.css'

export const SearchBoxApi = ({
  quantity,
  result
}: {
  quantity: number
  result: (query: string) => void
}) => {
  const filterProducts = (query: string) => {
    result(query)
  }

  return (
    <div className={styles['search-box']}>
      <InputText
        placeholder="Search for a smartphone..."
        onChange={(e) => filterProducts(e.target.value)}
      />

      <span className={styles.quantity}>{quantity} Results</span>
    </div>
  )
}
