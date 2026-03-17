import Button from '@/components/Button/Button'
import Layout from '@/layouts/Layout'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useCallback, useRef } from 'react'
import TrackList from '@/components/TrackLIst/TrackList'
import { wrapper } from '@/store'
import { fetchTracks, searchTracks } from '@/store/tracks'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import Input from '@/components/Input/Input'
import styles from './styles.module.scss'

const Index = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onClick = () => router.push('/tracks/create')

  const { tracks } = useAppSelector((state) => state.tracksReducer)

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      debounceTimer.current = setTimeout(() => {
        dispatch(searchTracks(value))
      }, 300)
    },
    [dispatch],
  )

  return (
    <Layout>
      <h2 className={styles.title}>Track list</h2>
      <Button text="Add new track" onClick={onClick} />
      <Input id="searchTracks" label="SearchTracks" onChange={onChange} />
      <TrackList tracks={tracks} />
    </Layout>
  )
}

export default Index

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchTracks())
    return {
      props: {},
    }
  },
)
