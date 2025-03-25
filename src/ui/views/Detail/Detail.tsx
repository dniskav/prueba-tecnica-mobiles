import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import styles from './details.module.css'
import { useProductContext } from '../../stores/ProductContext'

export function Detail() {
  const { id } = useParams()
  const { state, getProductById, clearSelected } = useProductContext()
  const { selected } = state

  useEffect(() => {
    if (id) getProductById(id)

    return () => {
      clearSelected()
    }
  }, [id])

  return (
    <div className={styles['product-details']}>
      <section className={styles.overview}>
        <div className={styles['image-container']}>
          <img src={selected?.colorOptions[0]?.imageUrl} />
        </div>

        <div className={styles['info-container']}>
          <div className={styles.info}>
            {selected?.name}
            {selected?.basePrice}
          </div>
        </div>
      </section>
      <section className={styles.specifications}>s</section>
      <section className={styles.similarProducts}>s</section>

      {JSON.stringify(selected)}
    </div>
  )
}
