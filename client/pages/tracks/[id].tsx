import Button from '@/components/Button/Button'
import Layout from '@/layouts/Layout'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Input from '@/components/Input/Input'
import useInput from '@/hooks/useInput'
import { ITrack } from '@/types/tracks'

interface ITrackPage {
  serverTrack: ITrack
}

const TrackPage: React.FC<ITrackPage> = ({ serverTrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack)
  const router = useRouter()
  const username = useInput('')
  const comment = useInput('')

  const goBack = () => router.push('/tracks')

  const addComment = async () => {
    const res = await fetch('http://localhost:5000/tracks/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        text: comment.value,
        trackId: track._id,
      }),
    })

    const data = await res.json()

    setTrack({ ...track, comments: [...track.comments, data] })
  }

  return (
    <Layout>
      <Button text="Back to list" onClick={goBack} />
      <div>
        <div className={styles.artistInfo}>
          <Image
            src={`http://localhost:5000/${track.picture}`}
            width={200}
            height={200}
            alt="Track image"
          />
          <div className={styles.trackInfo}>
            <h3>Artist - {track.artist}</h3>
            <h2>Track name - {track.name}</h2>
            <p>Listens count: {track.listens}</p>
          </div>
        </div>
        <h4>Song lyrics:</h4>
        <p>{track.text}</p>
        <h4>Add comment:</h4>
        <Input id="username" label="Your Name" {...username} />
        <Input id="comment" label="Your Comment" {...comment} textarea={3} />
        <Button text="Add comment" onClick={addComment} />
        <div>
          {track.comments.map((c) => (
            <div>
              <p>{c.username}</p>
              <span>{c.text}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default TrackPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch('http://localhost:5000/tracks/' + params?.id)
  const data = await res.json()

  return {
    props: {
      serverTrack: data,
    },
  }
}
