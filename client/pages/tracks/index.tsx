import Button from '@/components/Button/Button'
import Layout from '@/layouts/Layout'
import { useRouter } from 'next/router'
import React from 'react'
import { ITrack } from '@/types/tracks'
import TrackList from '@/components/TrackLIst/TrackList'
import { AppDispatch, wrapper } from '@/store'
import { fetchTracks, searchTracks } from '@/store/tracks'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import Input from '@/components/Input/Input'

const Index = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const onClick = () => router.push('/tracks/create')

  const { tracks } = useAppSelector((state) => state.tracksReducer)

  const onChange = (e) => {
    const value = e.target.value

    dispatch(searchTracks(value))
  }

  return (
    <Layout>
      <h2>Track list</h2>
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
