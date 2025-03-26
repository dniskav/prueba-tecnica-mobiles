import logo from '/logo-mbst.svg'
import styles from './header.module.css'
import { CartIcon } from '../CartIcon/CartIcon'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import back from '/back.svg'

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
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
      {location.pathname !== '/' && (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            navigate(-1)
          }}
          className={styles['back-button']}>
          <img src={back} className={styles['icon-back']} />
          BACK
        </a>
      )}
    </header>
  )
}
