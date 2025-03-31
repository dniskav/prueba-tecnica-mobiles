import { useNavigate } from 'react-router-dom'
import styles from './Cart.module.css'
import Button from '../../components/Button/Button'
import { useCurrency } from '../../../core/hooks'
import { useProductContext, CartItem } from '../../stores/productContext'

export function Cart() {
  const navigate = useNavigate()
  const currencyFormatter = useCurrency('EUR', 'es-ES', 'code')
  const { state, removeFromCart, addToCart, decreaseQuantity } = useProductContext()
  const { cart } = state

  const totalAmount = cart.reduce((acc: number, item: CartItem) => acc + item.totalPrice, 0)
  const totalItems = cart.reduce((acc: number, item: CartItem) => acc + item.quantity, 0)

  const handleContinueShopping = () => {
    navigate('/')
  }

  const handlePayment = () => {
    alert('going to pay')
  }

  const handleRemoveItem = (id: string) => {
    removeFromCart(id)
  }

  const handleIncreaseQuantity = (item: CartItem) => {
    const { ...itemWithoutQuantity } = item
    addToCart(itemWithoutQuantity)
  }

  const handleDecreaseQuantity = (id: string) => {
    decreaseQuantity(id)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CART ({totalItems})</h1>

      {cart.length > 0 && (
        <div className={styles.itemsContainer}>
          {cart.map((item: CartItem) => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.imageContainer}>
                <img src={item.imageUrl} alt={item.name} />
              </div>
              <div className={styles.itemDetails}>
                <h2 className={styles.itemName}>{item.name}</h2>
                <p className={styles.itemConfiguration}>
                  {item.capacity} | {item.colorName}
                </p>
                <p className={styles.itemPrice}>{currencyFormatter(item.price)}</p>

                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleDecreaseQuantity(item.id)}
                    aria-label="Decrease quantity">
                    -
                  </button>
                  <span className={styles.quantityDisplay}>{item.quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleIncreaseQuantity(item)}
                    aria-label="Increase quantity">
                    +
                  </button>
                </div>

                {item.quantity > 1 && (
                  <p className={styles.itemTotalPrice}>
                    Total: {currencyFormatter(item.totalPrice)}
                  </p>
                )}

                <button className={styles.removeButton} onClick={() => handleRemoveItem(item.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.contentSpacer}></div>

      <div className={styles.actionsDesktop}>
        <Button secondary onClick={handleContinueShopping}>
          CONTINUE SHOPPING
        </Button>

        {cart.length > 0 && (
          <>
            <div className={styles.totalContainer}>
              <span className={styles.summaryLabel}>TOTAL</span>
              <span className={styles.summaryValue}>{currencyFormatter(totalAmount)}</span>
            </div>

            <Button onClick={handlePayment}>PAY</Button>
          </>
        )}
      </div>

      <div className={styles.actionsMobile}>
        {cart.length > 0 ? (
          <>
            <div className={styles.totalContainer}>
              <span className={styles.summaryLabel}>TOTAL</span>
              <span className={styles.summaryValue}>{currencyFormatter(totalAmount)}</span>
            </div>

            <div className={styles.actionsMobileButtons}>
              <Button secondary onClick={handleContinueShopping} block>
                CONTINUE SHOPPING
              </Button>

              <Button onClick={handlePayment} block>
                PAY
              </Button>
            </div>
          </>
        ) : (
          <>
            <Button secondary onClick={handleContinueShopping} block>
              CONTINUE SHOPPING
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
