import TrackItem from '@/components/TrackItem/TrackItem'
import { ITrack } from '@/types/tracks'
import React from 'react'
import styles from './styles.module.scss'

interface ITrackList {
  tracks: ITrack[]
}

const TrackList: React.FC<ITrackList> = ({ tracks }) => {
  return (
    <div className={styles.trackList}>
      {tracks.map((track) => {
        return <TrackItem key={track._id} track={track} />
      })}
    </div>
  )
}

export default TrackList
