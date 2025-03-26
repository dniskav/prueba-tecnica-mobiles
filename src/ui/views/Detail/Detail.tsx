import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import styles from './details.module.css'
import { useProductContext } from '../../stores/ProductContext'
import { useCurrency } from '../../../core/hooks'

export function Detail() {
  const { id } = useParams()
  const currencyFormatter = useCurrency('EUR', 'es-ES', 'code')
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
            <h1 className={styles.name}>{selected?.name}</h1>
            <div className={styles.price}>From {currencyFormatter(selected?.basePrice || 0)}</div>

            <div className={styles.storage}>Storage ¿HOW MUCH SPACE DO YOU NEED?</div>
          </div>
        </div>
      </section>
      <section className={styles.specifications}>s</section>
      <section className={styles.similarProducts}>s</section>

      {JSON.stringify(selected)}
    </div>
  )
}
