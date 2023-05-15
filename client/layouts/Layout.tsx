import React from 'react'
import { useRouter } from 'next/router'
import styles from './styles.module.css'
import Player from '@/components/Player/Player'
import Head from 'next/head'

const pages = [
  {
    id: 'main',
    title: 'Main Page',
    path: '/',
  },
  {
    id: 'tracks',
    title: 'Track List',
    path: '/tracks',
  },
  {
    id: 'albums',
    title: 'Albums List',
    path: '/albums',
  },
]

interface ILayout {
  children: React.ReactNode
  title?: string
  description?: string
}

const Layout: React.FC<ILayout> = ({ children, title, description }) => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{title || 'Spotify clone'}</title>
        <meta
          name="description"
          content={`This is a Spotify clone app. You can add your favorite tracks and comments to them. ${description}`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="music, song, player, artist" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.layout}>
        <nav>
          <ul>
            {pages.map((page) => (
              <li key={page.id} onClick={() => router.push(page.path)}>
                <a href={page.path}>{page.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <main className={styles.page}>{children}</main>
        <Player />
      </div>
    </>
  )
}

export default Layout
