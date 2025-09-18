import { useEffect, useMemo, useRef, useState } from 'react'

export default function VideoModal({ item, onClose }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Reset when opening a different item
  useEffect(() => { setIndex(0) }, [item])

  // Lock page scroll while modal is open so it behaves like a separate page
  useEffect(() => {
    if (item) document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [item])

  const isProject = item && Array.isArray(item.items)
  const itemsList = isProject ? item.items : (item ? [item] : [])
  const current = itemsList[index]
  const videoRef = useRef(null)
  const mediaRef = useRef(null)

  // Try to autoplay whenever the current item changes
  useEffect(() => {
    const el = videoRef.current
    if (el && typeof el.play === 'function') {
      const play = async () => {
        try { await el.play() } catch { /* ignore autoplay errors */ }
      }
      if (el.readyState >= 2) play()
      else el.addEventListener('canplay', play, { once: true })
    }
  }, [current])

  const embedSrc = useMemo(() => {
    if (!current?.embedUrl) return null
    return current.embedUrl.includes('?') ? `${current.embedUrl}&autoplay=1` : `${current.embedUrl}?autoplay=1`
  }, [current])

  if (!item) return null

  const handleModalClick = (e) => {
    // Close when clicking anywhere outside the media element, but allow buttons
    if (e.target.closest('button')) return
    if (mediaRef.current && !mediaRef.current.contains(e.target)) onClose()
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal" onClick={handleModalClick}>
        <div className="modal-header">
          <strong>{item.title}</strong>
        </div>
        <div className="media-unit">
          <div className="modal-media" ref={mediaRef}>
          {current?.embedUrl ? (
            <iframe
              key={embedSrc}
              src={embedSrc}
              title={item.title}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              key={current?.src || item.src}
              ref={videoRef}
              src={current?.src || item.src}
              poster={item.poster}
              controls
              playsInline
              autoPlay
            />
          )}
          </div>
          <div className="credits-below">
            {(item.credits && item.credits.trim()) || `Directed by: —\nEdited by: Joan Colomer\nProduction: —\nClient: —`}
          </div>
        </div>
        <div className="modal-footer">
          <div className="footer-row">
            {isProject && itemsList.length > 1 && (
              <button onClick={(e) => { e.stopPropagation(); setIndex((i) => (i - 1 + itemsList.length) % itemsList.length) }} aria-label="Previous">← Prev</button>
            )}
            {isProject && itemsList.length > 1 && (
              <button onClick={(e) => { e.stopPropagation(); setIndex((i) => (i + 1) % itemsList.length) }} aria-label="Next">Next →</button>
            )}
          </div>
          <div className="credits">{item.credits || ''}</div>
        </div>
      </div>
    </div>
  )
}


