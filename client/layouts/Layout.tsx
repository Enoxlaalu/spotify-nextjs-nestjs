import React from 'react'
import { useRouter } from 'next/router'
import styles from './styles.module.css'
import Player from '@/components/Player/Player'

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
}

const Layout: React.FC<ILayout> = ({ children }) => {
  const router = useRouter()

  return (
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
  )
}

export default Layout
