import { Pause, PlayArrow } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { SyntheticEvent } from 'react'

interface IPlayPauseButton {
  active: boolean
}

const PlayPauseButton: React.FC<IPlayPauseButton> = ({ active }) => {
  const stopPropagation = (e: SyntheticEvent) => e.stopPropagation()

  return (
    <IconButton onClick={stopPropagation}>
      {active ? <Pause /> : <PlayArrow />}
    </IconButton>
  )
}

export default PlayPauseButton
