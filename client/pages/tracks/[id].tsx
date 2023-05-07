import Button from '@/components/Button/Button'
import Layout from '@/layouts/Layout'
import Image from 'next/image'
import React from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'

const TrackPage = () => {
  const router = useRouter()

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

  const goBack = () => router.push('/tracks')

  return (
    <Layout>
      <Button text="Back to list" onClick={goBack} />
      <div className={styles.trackPage}>
        <Image src={track.picture} width={200} height={200} alt="Track image" />
        <div className={styles.trackInfo}>
          <h3>Artist - {track.artist}</h3>
          <h2>Track name - {track.name}</h2>
          <p>Listens count: {track.listens}</p>
        </div>
      </div>
    </Layout>
  )
}

export default TrackPage
