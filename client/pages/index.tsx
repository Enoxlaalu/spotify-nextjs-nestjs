import React from 'react'
import styles from './styles.module.scss'
import Layout from '@/layouts/Layout'
import Button from '@/components/Button/Button'
import { useRouter } from 'next/router'
import { MusicNote, ChatBubble, LibraryMusic } from '@mui/icons-material'

const Index = () => {
  const router = useRouter()

  return (
    <Layout>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          Your music,
          <br />
          your world.
        </h1>
        <p className={styles.subtitle}>
          The best tracks collection — listen, comment and enjoy.
        </p>
        <Button
          text="Explore tracks →"
          onClick={() => router.push('/tracks')}
        />
      </div>

      <div className={styles.features}>
        <div className={styles.card}>
          <MusicNote sx={{ fontSize: 32 }} />
          <h3>Listen</h3>
          <p>Stream any track instantly from your collection</p>
        </div>
        <div className={styles.card}>
          <ChatBubble sx={{ fontSize: 32 }} />
          <h3>Comment</h3>
          <p>Share your thoughts and reactions on any track</p>
        </div>
        <div className={styles.card}>
          <LibraryMusic sx={{ fontSize: 32 }} />
          <h3>Collect</h3>
          <p>Build and grow your personal music library</p>
        </div>
      </div>
    </Layout>
  )
}

export default Index
