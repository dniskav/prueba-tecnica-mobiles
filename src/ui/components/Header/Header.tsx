import logo from '/logo.svg'
import styles from './header.module.css'
import { CartIcon } from '../CartIcon/CartIcon'

export function Header() {
  return (
    <header>
      <nav className={styles.header}>
        <a href="/">
          <img src={logo} alt="logo" className={styles.logo} />
        </a>

        <CartIcon />
      </nav>
    </header>
  )
}
