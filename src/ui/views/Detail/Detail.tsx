import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './details.module.css'

import { useCurrency } from '../../../core/hooks'
import { useProductContext } from '../../stores/productContext'
import { Specs } from '../../components/Specs'
import Button from '../../components/Button/Button'
import ItemsCarrousel from '../../components/ItemsCarrousel/ItemsCarrousel'

export function Detail() {
  const { id } = useParams()
  const currencyFormatter = useCurrency('EUR', 'es-ES', 'code')
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null)
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const { state, getProductById, clearSelected } = useProductContext()
  const { selected } = state

  useEffect(() => {
    if (id) getProductById(id)

    return () => {
      clearSelected()
    }
  }, [id])

  useEffect(() => {
    if (!selected) return

    const { colorOptions, storageOptions, basePrice } = selected

    if (colorOptions?.length > 0) {
      const firstColor = colorOptions[0]
      setSelectedColor(firstColor.hexCode)
      setSelectedImage(firstColor.imageUrl)
    }

    if (storageOptions?.length === 0) {
      setSelectedPrice(basePrice)
    }
  }, [selected])

  const setCapacity = (capacity: string, price: number) => {
    setSelectedCapacity(capacity)
    setSelectedPrice(price)
  }

  const setColor = (options: any) => {
    setSelectedColor(options.hexCode)
    setSelectedImage(options.imageUrl)
  }

  const getMinPrice = () => {
    if (selected && selected.storageOptions && selected.storageOptions.length > 0) {
      return Math.min(...selected.storageOptions.map((option) => option.price))
    }
    return selected?.basePrice || 0
  }

  if (!selected) {
    return <div className={styles.loading}>Cargando producto...</div>
  }

  return (
    <div className={styles['product-details']}>
      <section className={styles.overview}>
        <div className={styles['image-container']}>
          {selectedImage && <img src={selectedImage} />}
        </div>

        <div className={styles['info-container']}>
          <div className={styles.info}>
            <div className={styles.infoHeader}>
              <h1 className={styles.name}>{selected.name}</h1>
              <div className={styles.price}>
                {selectedCapacity
                  ? currencyFormatter(selectedPrice ?? 0)
                  : `From ${currencyFormatter(getMinPrice())}`}
              </div>
            </div>

            <div className={styles.storage}>
              <div>Storage ¿HOW MUCH SPACE DO YOU NEED?</div>

              <div className={styles.capacities}>
                {selected.storageOptions?.map(({ capacity, price }) => {
                  return (
                    <label
                      key={capacity}
                      className={`${styles.option} ${
                        selectedCapacity === capacity ? styles.selected : ''
                      }`}>
                      <input
                        type="radio"
                        name="storage"
                        value={capacity}
                        checked={selectedCapacity === capacity || false}
                        onChange={() => setCapacity(capacity, price)}
                      />
                      <span>{capacity}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            <div className={styles.colors}>
              <div>color. pick your favourite</div>

              <div className={styles.colorSelector}>
                {selected.colorOptions.map((option) => (
                  <label
                    key={option.hexCode}
                    className={`${styles.colorOption} ${
                      selectedColor === option.hexCode ? styles.selected : ''
                    }`}>
                    <div
                      className={styles.square}
                      style={{ backgroundColor: option.hexCode }}></div>
                    <input
                      type="radio"
                      name="color"
                      value={option.hexCode}
                      checked={selectedColor === option.hexCode || false}
                      onChange={() => setColor(option)}
                    />
                  </label>
                ))}
              </div>
              <div className={styles.colorName}>
                {selected.colorOptions.find((c) => c.hexCode === selectedColor)?.name || ''}
              </div>
            </div>
            <Button onClick={() => console.log('Añadido al carrito')} disabled={!selectedCapacity}>
              AÑADIR
            </Button>
          </div>
        </div>
      </section>
      <section className={styles.specifications}>
        {selected.specs && (
          <div className={styles.specsContainer}>
            <Specs specs={selected.specs} />
          </div>
        )}
      </section>

      <ItemsCarrousel items={selected.similarProducts || []} title="PRODUCTOS SIMILARES" />
    </div>
  )
}
