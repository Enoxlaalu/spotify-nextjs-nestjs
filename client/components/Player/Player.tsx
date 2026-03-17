import PlayPauseButton from '@/components/PlayPauseButton/PlayPauseButton'
import TrackProgress from '@/components/TrackProgress/TrackProgress'
import { VolumeUp } from '@mui/icons-material'
import React, { ChangeEvent, useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
  pauseTrack,
  playTrack,
  setCurrentTime,
  setDuration,
  setVolume,
} from '@/store/player'
import { API_URL } from '@/config/api'

const Player = () => {
  const { active, currentTime, duration, pause, volume } = useAppSelector(
    (state) => state.player,
  )
  const dispatch = useAppDispatch()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (pause) {
      dispatch(playTrack())
      audio.play()
    } else {
      dispatch(pauseTrack())
      audio.pause()
    }
  }

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }
    const audio = audioRef.current

    if (active) {
      audio.src = `${API_URL}/${active.audio}`
      audio.volume = volume / 100
      audio.onloadedmetadata = () => {
        dispatch(setDuration(Math.ceil(audio.duration)))
      }
      audio.ontimeupdate = () => {
        dispatch(setCurrentTime(Math.ceil(audio.currentTime)))
      }
      dispatch(playTrack())
      audio.play()
    }
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (audioRef.current) audioRef.current.volume = value / 100
    dispatch(setVolume(value))
  }

  const searchInTrack = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (audioRef.current) audioRef.current.currentTime = value
    dispatch(setCurrentTime(value))
  }

  if (!active) return null

  return (
    <div className={styles.player}>
      <div className={styles.trackInfo}>
        <div className={styles.meta}>
          <p className={styles.name}>{active.name}</p>
          <span className={styles.artist}>{active.artist}</span>
        </div>
      </div>
      <div className={styles.controls}>
        <PlayPauseButton active={!pause} togglePlay={togglePlay} />
        <TrackProgress
          left={0}
          right={duration}
          onChange={searchInTrack}
          value={currentTime}
        />
      </div>
      <div className={styles.volumeControl}>
        <VolumeUp fontSize="small" />
        <TrackProgress
          left={0}
          right={100}
          onChange={changeVolume}
          value={volume}
        />
      </div>
    </div>
  )
}

export default Player
