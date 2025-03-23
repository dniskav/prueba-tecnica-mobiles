import logo from '/logo.svg'
import styles from './header.module.css'
import { CartIcon } from '../CartIcon/CartIcon'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header>
      <nav className={styles.header}>
        <Link to="/" className={styles.link}>
          <img src={logo} alt="logo" className={styles.logo} />
        </Link>

        <Link to="/cart" className={styles.link}>
          <CartIcon />
        </Link>
      </nav>
    </header>
  )
}
