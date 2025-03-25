import { useParams } from 'react-router-dom'
import { useProductStore } from '../../stores/useProductStore'
import { useEffect } from 'react'
import styles from './details.module.css'

export function Detail() {
  const { id } = useParams()
  const productDetail = useProductStore((state) => state.productDetail)
  const fetchProductDetail = useProductStore((state) => state.fetchProductDetail)

  useEffect(() => {
    fetchProductDetail(id)
  }, [id])

  return (
    <div className={styles['product-details']}>
      <section className={styles.overview}>
        <div className={styles['image-container']}>
          <img src={productDetail?.colorOptions[0]?.imageUrl} />
        </div>

        <div className={styles['info-container']}>
          <div className={styles.info}>
            {productDetail?.name}
            {productDetail?.basePrice}
          </div>
        </div>
      </section>
      <section className={styles.specifications}>s</section>
      <section className={styles.similarProducts}>s</section>

      {JSON.stringify(productDetail)}
    </div>
  )
}
