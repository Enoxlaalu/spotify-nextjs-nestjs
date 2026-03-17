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
import { API_URL } from '@/config/api'

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
    try {
      const res = await fetch(`${API_URL}/tracks/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.value,
          text: comment.value,
          trackId: track._id,
        }),
      })
      if (!res.ok) throw new Error('Failed to post comment')
      const data = await res.json()
      setTrack({ ...track, comments: [...track.comments, data] })
    } catch (err) {
      alert('Failed to post comment. Please try again.')
    }
  }

  return (
    <Layout>
      <Button text="← Back to list" onClick={goBack} />

      <div className={styles.artistInfo}>
        <Image
          src={`${API_URL}/${track.picture}`}
          width={200}
          height={200}
          alt="Track image"
        />
        <div className={styles.trackInfo}>
          <h3>{track.artist}</h3>
          <h2>{track.name}</h2>
          <p>{track.listens} listens</p>
        </div>
      </div>

      <div className={styles.section}>
        <h4>Song lyrics</h4>
        <p className={styles.lyrics}>{track.text}</p>
      </div>

      <div className={styles.section}>
        <h4>Add comment</h4>
        <div className={styles.commentForm}>
          <Input id="username" label="Your Name" {...username} />
          <Input id="comment" label="Your Comment" {...comment} textarea={3} />
          <Button text="Post comment" onClick={addComment} />
        </div>
      </div>

      <div className={styles.section}>
        <h4>Comments</h4>
        {track.comments.map((c) => (
          <div key={c._id} className={styles.comment}>
            <p>{c.username}</p>
            <span>{c.text}</span>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default TrackPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const res = await fetch(`${API_URL}/tracks/${params?.id}`)
    if (!res.ok) {
      return { notFound: true }
    }
    const data = await res.json()
    return { props: { serverTrack: data } }
  } catch {
    return { notFound: true }
  }
}
