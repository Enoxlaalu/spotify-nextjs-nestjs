import React, { ChangeEvent } from 'react'
import styles from './styles.module.scss'

interface IInput {
  id: string
  label: string
  value?: string
  textarea?: number
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const Input: React.FC<IInput> = ({ id, label, value, textarea, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id}>{label}</label>
      {textarea ? (
        <textarea id={id} rows={textarea} value={value} onChange={onChange} />
      ) : (
        <input id={id} type="text" value={value} onChange={onChange} />
      )}
    </div>
  )
}

export default Input
