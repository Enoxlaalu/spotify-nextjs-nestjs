import PlayPauseButton from '@/components/PlayPauseButton/PlayPauseButton'
import TrackProgress from '@/components/TrackProgress/TrackProgress'
import { VolumeUp } from '@mui/icons-material'
import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { pauseTrack, playTrack } from '@/store/player'

interface IPlayer {
  active: boolean
}

let audio: HTMLAudioElement

const Player: React.FC<IPlayer> = () => {
  const src = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
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
  const { active, currentTime, duration, pause, volume } = useAppSelector(
    (state) => state.player,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!audio) {
      audio = new Audio()
      audio.src = src
    }
  }, [])

  const togglePlay = () => {
    if (pause) {
      dispatch(playTrack())
      audio.play()
    } else {
      dispatch(pauseTrack())
      audio.pause()
    }
  }

  return (
    <div className={styles.player}>
      <PlayPauseButton active={!pause} togglePlay={togglePlay} />
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
