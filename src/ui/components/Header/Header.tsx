import logo from '/logo-mbst.svg'
import styles from './header.module.css'
import { CartIcon } from '../CartIcon/CartIcon'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
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
