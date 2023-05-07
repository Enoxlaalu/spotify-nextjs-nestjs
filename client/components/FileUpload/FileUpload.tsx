import React, { ChangeEvent, Ref, useRef } from 'react'
import styles from './styles.module.scss'

interface IFileUpload {
  children: React.ReactNode
  accept: string
  setFile: (file: File) => void
}

const FileUpload: React.FC<IFileUpload> = ({ children, accept, setFile }) => {
  const ref = useRef<HTMLInputElement>(null)

  const onClick = () => ref.current?.click()

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    e.target.files && setFile(e.target.files[0])

  return (
    <div className={styles.fileUpload} onClick={onClick}>
      <input type="file" accept={accept} ref={ref} onChange={onChange} />
      {children}
    </div>
  )
}

export default FileUpload
