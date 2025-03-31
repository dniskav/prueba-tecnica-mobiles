import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Cart.module.css'
import Button from '../../components/Button/Button'
import { useCurrency } from '../../../core/hooks'
import { useProductContext, CartItem } from '../../stores/productContext'

export function Cart() {
  const navigate = useNavigate()
  const currencyFormatter = useCurrency('EUR', 'es-ES', 'code')
  const { state, removeFromCart } = useProductContext()
  const { cart } = state

  const totalAmount = cart.reduce((acc: number, item: CartItem) => acc + item.price, 0)
  const cartCount = cart.length

  const handleContinueShopping = () => {
    navigate('/list')
  }

  const handlePayment = () => {
    alert('going to pay')
  }

  const handleRemoveItem = (id: string) => {
    removeFromCart(id)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CART ({cartCount})</h1>

      {cartCount > 0 ? (
        <>
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
                  <button className={styles.removeButton} onClick={() => handleRemoveItem(item.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>TOTAL</span>
              <span className={styles.summaryValue}>{currencyFormatter(totalAmount)}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <Button secondary onClick={handleContinueShopping}>
              CONTINUE SHOPPING
            </Button>
            <Button onClick={handlePayment}>PAY</Button>
          </div>
        </>
      ) : (
        <div className={styles.emptyCart}>
          <p>Your cart is empty</p>
          <Button secondary onClick={handleContinueShopping}>
            CONTINUE SHOPPING
          </Button>
        </div>
      )}
    </div>
  )
}
