import { ITrack } from '@/types/tracks'
import React, { SyntheticEvent } from 'react'
import styles from './styles.module.scss'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import PlayPauseButton from '@/components/PlayPauseButton/PlayPauseButton'
import { useAppDispatch } from '@/hooks/redux'
import { playTrack, setActive } from '@/store/player'

interface ITrackItem {
  track: ITrack
  active?: boolean
}

const TrackItem: React.FC<ITrackItem> = ({ track, active = false }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const onClick = () => router.push(`/tracks/${track._id}`)

  const stopPropagation = (e: SyntheticEvent) => e.stopPropagation()

  const togglePlay = (e: SyntheticEvent) => {
    e.stopPropagation()
    dispatch(setActive(track))
  }

  return (
    <div className={styles.track} onClick={onClick}>
      <PlayPauseButton active={active} togglePlay={togglePlay} />
      <Image
        className={styles.image}
        alt="trackImage"
        src={`http://localhost:5000/${track.picture}`}
        width={70}
        height={70}
      />
      <div>
        <p>{track.name}</p>
        <span>{track.artist}</span>
      </div>
      {active && <span>02:32 / 03:44</span>}
      <IconButton onClick={stopPropagation}>
        <Delete />
      </IconButton>
    </div>
  )
}

export default TrackItem
