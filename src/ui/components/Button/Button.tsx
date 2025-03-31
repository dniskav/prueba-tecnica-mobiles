import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  onClick: () => void
  disabled?: boolean
  secondary?: boolean
  block?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  secondary = false,
  block = false
}) => {
  return (
    <button
      className={`${styles.button} ${secondary ? styles.secondary : ''} ${
        block ? styles.block : ''
      }`}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
