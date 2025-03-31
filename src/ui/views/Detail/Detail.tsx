import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './details.module.css'

import { useCurrency } from '../../../core/hooks'
import { useProductContext } from '../../stores/productContext'
import { useCartContext } from '../../stores/cartContext'
import { Specs } from '../../components/Specs'
import Button from '../../components/Button/Button'
import ItemsCarrousel from '../../components/ItemsCarrousel/ItemsCarrousel'
import { StorageOption, ColorOption } from '../../../modules/product/domain/Product'

export function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const currencyFormatter = useCurrency('EUR', 'es-ES', 'code')
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null)
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const { state, getProductById, clearSelected } = useProductContext()
  const { addToCart } = useCartContext()
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

  const setColor = (options: ColorOption) => {
    setSelectedColor(options.hexCode)
    setSelectedImage(options.imageUrl)
  }

  const getMinPrice = () => {
    if (selected && selected.storageOptions && selected.storageOptions.length > 0) {
      return Math.min(...selected.storageOptions.map((option: StorageOption) => option.price))
    }
    return selected?.basePrice || 0
  }

  const handleAddToCart = () => {
    if (selected && selectedCapacity && selectedColor) {
      const cartItem = {
        id: `${selected.id}-${selectedCapacity}-${selectedColor}`,
        name: selected.name,
        price: selectedPrice ?? 0,
        imageUrl: selectedImage ?? '',
        capacity: selectedCapacity,
        colorName:
          selected.colorOptions.find((c: ColorOption) => c.hexCode === selectedColor)?.name || ''
      }
      addToCart(cartItem)
      navigate('/cart')
    }
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
                {selected.storageOptions?.map(({ capacity, price }: StorageOption) => {
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
                {selected.colorOptions.map((option: ColorOption) => (
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
                {selected.colorOptions.find((c: ColorOption) => c.hexCode === selectedColor)
                  ?.name || ''}
              </div>
            </div>
            <Button onClick={handleAddToCart} disabled={!selectedCapacity} block>
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
