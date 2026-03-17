import { ITrack } from '@/types/tracks'
import React, { SyntheticEvent } from 'react'
import styles from './styles.module.scss'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import PlayPauseButton from '@/components/PlayPauseButton/PlayPauseButton'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { API_URL } from '@/config/api'
import { setActive, playTrack, pauseTrack } from '@/store/player'
import { deleteTrack } from '@/store/tracks'

interface ITrackItem {
  track: ITrack
  active?: boolean
}

const TrackItem: React.FC<ITrackItem> = ({ track, active = false }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { pause } = useAppSelector((state) => state.player)

  const onClick = () => router.push(`/tracks/${track._id}`)

  const onDelete = (e: SyntheticEvent) => {
    e.stopPropagation()
    if (!window.confirm(`Delete "${track.name}"?`)) return
    dispatch(deleteTrack(track._id))
  }

  const togglePlay = (e: SyntheticEvent) => {
    e.stopPropagation()
    if (active && !pause) {
      dispatch(pauseTrack())
    } else {
      dispatch(setActive(track))
      dispatch(playTrack())
    }
  }

  return (
    <div className={styles.track} onClick={onClick}>
      <PlayPauseButton active={active} togglePlay={togglePlay} />
      <Image
        className={styles.image}
        alt="trackImage"
        src={`${API_URL}/${track.picture}`}
        width={56}
        height={56}
      />
      <div className={styles.info}>
        <p>{track.name}</p>
        <span>{track.artist}</span>
      </div>
      <IconButton className={styles.deleteBtn} onClick={onDelete}>
        <Delete fontSize="small" />
      </IconButton>
    </div>
  )
}

export default TrackItem
