import React from 'react'

interface ITrackProgress {
  left: number
  right: number
}

const TrackProgress: React.FC<ITrackProgress> = ({ left, right }) => {
  return (
    <div>
      <input type="range" min={left} max={right} />
      <span>
        {right} / {left}
      </span>
    </div>
  )
}

export default TrackProgress
