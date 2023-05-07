import Button from '@/components/Button/Button'
import Layout from '@/layouts/Layout'
import { useRouter } from 'next/router'
import React from 'react'
import { ITrack } from '@/types/tracks'
import TrackList from '@/components/TrackLIst/TrackList'

const Index = () => {
  const router = useRouter()
  const onClick = () => router.push('/tracks/create')

  const tracks: ITrack[] = [
    {
      _id: '1',
      name: 'Track 1',
      artist: 'Artist',
      text: 'Text',
      audio: 'http:/localhost:5000/audio/audio.mp3',
      picture:
        'http:/localhost:5000/image/5b39dd59-40e6-41bf-932b-a2a1283b53a8.jpg',
      listens: 7,
      comments: [],
    },
    {
      _id: '2',
      name: 'Track 2',
      artist: 'Artist',
      text: 'Text',
      audio: 'http:/localhost:5000/audio/audio.mp3',
      picture:
        'http:/localhost:5000/image/5b39dd59-40e6-41bf-932b-a2a1283b53a8.jpg',
      listens: 7,
      comments: [],
    },
    {
      _id: '3',
      name: 'Track 3',
      artist: 'Artist',
      text: 'Text',
      audio: 'http:/localhost:5000/audio/audio.mp3',
      picture:
        'http:/localhost:5000/image/5b39dd59-40e6-41bf-932b-a2a1283b53a8.jpg',
      listens: 7,
      comments: [],
    },
  ]

  return (
    <Layout>
      <h2>Track list</h2>
      <Button text="Add new track" onClick={onClick} />
      <TrackList tracks={tracks} />
    </Layout>
  )
}

export default Index
