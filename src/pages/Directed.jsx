import { useState } from 'react'
import VideoModal from '../components/VideoModal'
import { directedVideos } from '../data/directedFromEdits'
import VideoThumb from '../components/VideoThumb'

export default function Directed() {
  const [active, setActive] = useState(null)

  return (
    <div className="center-viewport">
      <div className="grid">
        {directedVideos.map((item) => (
          <div key={item.id} className="grid-item">
            <button className="grid-thumb" onClick={() => setActive(item)} aria-label={`Open ${item.title}`}>
              {item.poster ? (
                <img src={item.poster} alt="" loading="lazy" />
              ) : (
                <VideoThumb src={item.src} alt={item.title} />
              )}
            </button>
            <div className="grid-caption">{item.title}</div>
          </div>
        ))}
      </div>
      <VideoModal item={active} onClose={() => setActive(null)} />
    </div>
  )
}


