import React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  onClick: () => void
  disabled?: boolean
  secondary?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  secondary = false
}) => {
  return (
    <button
      className={`${styles.button} ${secondary ? styles.secondary : ''}`}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
