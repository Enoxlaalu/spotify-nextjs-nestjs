import PlayPauseButton from '@/components/PlayPauseButton/PlayPauseButton'
import TrackProgress from '@/components/TrackProgress/TrackProgress'
import { VolumeUp } from '@mui/icons-material'
import React, { ChangeEvent, useEffect } from 'react'
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
  pauseTrack,
  playTrack,
  setCurrentTime,
  setDuration,
  setVolume,
} from '@/store/player'

interface IPlayer {
  active: boolean
}

let audio: HTMLAudioElement

const Player: React.FC<IPlayer> = () => {
  const { active, currentTime, duration, pause, volume } = useAppSelector(
    (state) => state.player,
  )
  const dispatch = useAppDispatch()

  const setAudio = () => {
    if (active) {
      audio.src = `http://localhost:5000/${active.audio}`
      audio.volume = volume / 100
      audio.onloadedmetadata = () => {
        dispatch(setDuration(Math.ceil(audio.duration)))
      }
      audio.ontimeupdate = () => {
        dispatch(setCurrentTime(Math.ceil(audio.currentTime)))
      }
    }
  }

  useEffect(() => {
    if (!audio) {
      audio = new Audio()
    }

    if (active) {
      setAudio()
      togglePlay()
    }
  }, [active])

  if (!active) return null

  const togglePlay = () => {
    if (pause) {
      dispatch(playTrack())
      audio.play()
    } else {
      dispatch(pauseTrack())
      audio.pause()
    }
  }

  const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    audio.volume = Number(value) / 100
    dispatch(setVolume(Number(value)))
  }

  const searchInTrack = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    audio.currentTime = Number(value)
    dispatch(setCurrentTime(Number(value)))
  }

  return (
    <div className={styles.player}>
      <PlayPauseButton active={!pause} togglePlay={togglePlay} />
      <div>
        <p>{active.name}</p>
        <span>{active.artist}</span>
      </div>
      <TrackProgress
        left={0}
        right={duration}
        onChange={searchInTrack}
        value={currentTime}
      />
      <VolumeUp />
      <TrackProgress
        left={0}
        right={100}
        onChange={changeVolume}
        value={volume}
      />
    </div>
  )
}

export default Player
