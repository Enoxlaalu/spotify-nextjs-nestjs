import React from 'react'

interface IInput {
  id: string
  label: string
  textarea?: number
}

const Input: React.FC<IInput> = ({ id, label, textarea }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {textarea ? (
        <textarea id={id} rows={textarea}></textarea>
      ) : (
        <input id={id} type="text" />
      )}
    </div>
  )
}

export default Input
