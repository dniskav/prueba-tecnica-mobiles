import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './details.module.css'

import { useCurrency } from '../../../core/hooks'
import { useProductContext } from '../../stores/productContext'

export function Detail() {
  const { id } = useParams()
  const currencyFormatter = useCurrency('EUR', 'es-ES', 'code')
  const [selectedCapacity, setSelectedCapacity] = useState('')
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState('')
  const { state, getProductById, clearSelected } = useProductContext()
  const { selected } = state

  useEffect(() => {
    if (id) getProductById(id)

    return () => {
      clearSelected()
    }
  }, [id])

  useEffect(() => {
    if (selected && selected.colorOptions && selected.colorOptions.length > 0) {
      const firstColor = selected.colorOptions[0]
      setSelectedColor(firstColor.hexCode)
      setSelectedImage(firstColor.imageUrl)

      if (selected.storageOptions && selected.storageOptions.length > 0) {
        const firstOption = selected.storageOptions[0]
        setSelectedCapacity(firstOption.capacity)
        setSelectedPrice(firstOption.price)
      } else {
        setSelectedPrice(selected.basePrice)
      }
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
            <h1 className={styles.name}>{selected.name}</h1>
            <div className={styles.price}>{currencyFormatter(selectedPrice)}</div>

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
                        checked={selectedCapacity === capacity}
                        onChange={() => setCapacity(capacity, price)}
                      />
                      <span>{capacity}</span>
                    </label>
                  )
                })}
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
                        checked={selectedColor === option.hexCode}
                        onChange={() => setColor(option)}
                      />
                    </label>
                  ))}
                </div>
                <div className={styles.colorName}>
                  {selected.colorOptions.find((c) => c.hexCode === selectedColor)?.name || ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.specifications}>
        {selected.specs && (
          <div className={styles.specsContainer}>{/* <Specs specs={selected.specs} /> */}</div>
        )}
      </section>
      <section className={styles.similarProducts}>
        {selected.similarProducts?.length > 0 && (
          <div className={styles.similarContainer}>
            <h2>Productos similares</h2>
            {/* Lista de productos similares */}
          </div>
        )}
      </section>
      <section className={styles.specifications}>s</section>
      <section className={styles.similarProducts}>s</section>

      {JSON.stringify(selected)}
    </div>
  )
}
