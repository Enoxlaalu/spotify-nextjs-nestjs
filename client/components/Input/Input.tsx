import React, { ChangeEvent } from 'react'

interface IInput {
  id: string
  label: string
  textarea?: number
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const Input: React.FC<IInput> = ({ id, label, textarea, onChange }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {textarea ? (
        <textarea id={id} rows={textarea} onChange={onChange}></textarea>
      ) : (
        <input id={id} type="text" onChange={onChange} />
      )}
    </div>
  )
}

export default Input
