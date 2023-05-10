import { Pause, PlayArrow } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { SyntheticEvent } from 'react'

interface IPlayPauseButton {
  active: boolean
  togglePlay: (e: SyntheticEvent) => void
}

const PlayPauseButton: React.FC<IPlayPauseButton> = ({
  active,
  togglePlay,
}) => {
  const onClick = (e: SyntheticEvent) => {
    togglePlay(e)
  }
  return (
    <IconButton onClick={onClick}>
      {active ? <Pause /> : <PlayArrow />}
    </IconButton>
  )
}

export default PlayPauseButton
