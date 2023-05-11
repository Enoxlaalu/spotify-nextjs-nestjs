import { IPlayerState } from '@/types/player'
import { ITrack } from '@/types/tracks'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState: IPlayerState = {
  pause: true,
  currentTime: 0,
  active: null,
  duration: 0,
  volume: 50,
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    pauseTrack: (state) => {
      return { ...state, pause: true }
    },
    playTrack: (state) => {
      return { ...state, pause: false }
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      return { ...state, currentTime: action.payload }
    },
    setVolume: (state, action: PayloadAction<number>) => {
      return { ...state, volume: action.payload }
    },
    setDuration: (state, action: PayloadAction<number>) => {
      return { ...state, duration: action.payload }
    },
    setActive: (state, action: PayloadAction<ITrack>) => {
      return { ...state, active: action.payload, duration: 0, currentTime: 0 }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log('HYDRATE', state, action.payload)
      return {
        ...state,
        ...action.payload.player,
      }
    },
  },
})

export const {
  pauseTrack,
  playTrack,
  setVolume,
  setActive,
  setCurrentTime,
  setDuration,
} = playerSlice.actions

export default playerSlice
