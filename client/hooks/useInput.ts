import { ChangeEvent, useState } from 'react'

export default (initialValue: string) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValue(e.target.value)

  return { value, onChange }
}
