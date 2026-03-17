import React, { ChangeEvent } from 'react'
import styles from './styles.module.scss'

interface ITrackProgress {
  left: number
  right: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: number
}

const TrackProgress: React.FC<ITrackProgress> = ({
  left,
  right,
  onChange,
  value,
}) => {
  return (
    <div className={styles.wrapper}>
      <input
        type="range"
        min={left}
        max={right}
        onChange={onChange}
        value={value}
      />
      <span>
        {value} / {right}
      </span>
    </div>
  )
}

export default TrackProgress
