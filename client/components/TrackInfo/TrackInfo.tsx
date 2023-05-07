import Input from '@/components/Input/Input'
import React from 'react'

const TrackInfo = () => {
  return (
    <div>
      <Input id="trackName" label="Track Name" />
      <Input id="artist" label="Artist Name" />
      <Input id="commnent" label="Comment" textarea={3} />
    </div>
  )
}

export default TrackInfo
