import { ITrack, ITracksState } from '@/types/tracks'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState: ITracksState = {
  tracks: [],
}

export const fetchTracks = createAsyncThunk(
  'tracksReducer/fetchTracks',
  // Declare the type your function argument here:
  async () => {
    const response = await fetch(`http://localhost:5000/tracks`)
    const json = await response.json()

    return json as ITrack[]
  },
)

const tracksSlice = createSlice({
  name: 'tracksReducer',
  initialState,
  reducers: {
    // fetchTracks: async () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      // console.log('HYDRATE', state, action.payload)
      return {
        ...state,
        ...action.payload.tracksReducer,
      }
    })
    builder.addCase(fetchTracks.fulfilled, (state, { payload }) => {
      state.tracks = payload
      console.log('state', state)
    })
  },
})

export default tracksSlice
