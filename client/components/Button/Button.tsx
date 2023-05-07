import React from 'react'
import styles from './styles.module.css'

interface IButton {
  text: string
  onClick?: () => void
  disabled?: boolean
}

const Button: React.FC<IButton> = ({ text, onClick, disabled }) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  )
}

export default Button
