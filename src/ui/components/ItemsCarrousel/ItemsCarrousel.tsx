import React from 'react'
import styles from './ItemsCarrousel.module.css'
import { Card } from '../Card/Card'
import { useHorizontalScroll } from '../../../core/hooks/useHorizontalScroll'

interface ItemsCarrouselProps {
  items: any[]
  title?: string
}

const ItemsCarrousel: React.FC<ItemsCarrouselProps> = ({ items, title = 'SIMILAR ITEMS' }) => {
  const { scrollRef, trackRef, thumbRef } = useHorizontalScroll()

  if (!items || items.length === 0) return null

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.carrouselContainer} ref={scrollRef}>
        {items.map((item) => (
          <div key={item.id} className={styles.carrouselItem}>
            <Card item={item} />
          </div>
        ))}
      </div>

      <div className={styles.scrollbarTrack} ref={trackRef}>
        <div className={styles.scrollbarThumb} ref={thumbRef}></div>
      </div>
    </section>
  )
}

export default ItemsCarrousel
