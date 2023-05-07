import PlayPauseButton from '@/components/PlayPauseButton/PlayPauseButton'
import TrackProgress from '@/components/TrackProgress/TrackProgress'
import { VolumeUp } from '@mui/icons-material'
import React from 'react'
import styles from './styles.module.scss'

interface IPlayer {
  active: boolean
}

const Player: React.FC<IPlayer> = ({ active }) => {
  const track = {
    _id: '1',
    name: 'Track 1',
    artist: 'Artist',
    text: 'Text',
    audio: 'http:/localhost:5000/audio/audio.mp3',
    picture:
      'http:/localhost:5000/image/664e7a41-b62d-4e2b-8d1d-b2a68aeda8e7.jpg',
    listens: 7,
    comments: [],
  }

  return (
    <div className={styles.player}>
      <PlayPauseButton active={active} />
      <div>
        <p>{track.name}</p>
        <span>{track.artist}</span>
      </div>
      <TrackProgress left={0} right={100} />
      <VolumeUp />
      <TrackProgress left={0} right={100} />
    </div>
  )
}

export default Player
