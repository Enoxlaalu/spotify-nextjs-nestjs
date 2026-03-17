import { ITrack, ITracksState } from '@/types/tracks'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { API_URL } from '@/config/api'

const initialState: ITracksState = {
  tracks: [],
}

export const fetchTracks = createAsyncThunk(
  'tracksReducer/fetchTracks',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${API_URL}/tracks`)
    if (!response.ok) return rejectWithValue('Failed to fetch tracks')
    return (await response.json()) as ITrack[]
  },
)

export const searchTracks = createAsyncThunk(
  'tracksReducer/searchTracks',
  async (query: string, { rejectWithValue }) => {
    const response = await fetch(
      `${API_URL}/tracks/search?query=${encodeURIComponent(query)}`,
    )
    if (!response.ok) return rejectWithValue('Search failed')
    return (await response.json()) as ITrack[]
  },
)

export const deleteTrack = createAsyncThunk(
  'tracksReducer/deleteTrack',
  async (id: string, { rejectWithValue }) => {
    const response = await fetch(`${API_URL}/tracks/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) return rejectWithValue('Failed to delete track')
    return id
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
    })
    builder.addCase(searchTracks.fulfilled, (state, { payload }) => {
      state.tracks = payload
    })
    builder.addCase(deleteTrack.fulfilled, (state, { payload }) => {
      state.tracks = state.tracks.filter((t) => t._id !== payload)
    })
  },
})

export default tracksSlice
