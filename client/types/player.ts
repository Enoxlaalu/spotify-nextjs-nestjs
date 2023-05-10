import { ITrack } from '@/types/tracks'

export interface IPlayerState {
  active: ITrack | null
  volume: number
  duration: number
  currentTime: number
  pause: boolean
}
