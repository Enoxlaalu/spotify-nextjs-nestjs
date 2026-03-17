import { Pause, PlayArrow } from '@mui/icons-material'
import React, { SyntheticEvent } from 'react'
import styles from './styles.module.scss'

interface IPlayPauseButton {
  active: boolean
  togglePlay: (e: SyntheticEvent) => void
}

const PlayPauseButton: React.FC<IPlayPauseButton> = ({
  active,
  togglePlay,
}) => {
  return (
    <button className={styles.btn} onClick={togglePlay}>
      {active ? <Pause /> : <PlayArrow />}
    </button>
  )
}

export default PlayPauseButton
