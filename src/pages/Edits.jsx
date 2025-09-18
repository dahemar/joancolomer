import { useMemo, useState } from 'react'
import VideoModal from '../components/VideoModal'
import { editsProjects as loaded } from '../data/loadEdits'
import { edits as fallback } from '../data/videos'
import VideoThumb from '../components/VideoThumb'
import { EDIT_CATEGORIES } from '../data/categories'
import { useSearchParams } from 'react-router-dom'

export default function Edits() {
  const [active, setActive] = useState(null)
  const [params, setParams] = useSearchParams()
  const filter = params.get('f') || 'all'
  const projects = useMemo(() => {
    return loaded && loaded.length
      ? loaded
      : fallback.map((e) => ({ id: e.id, title: e.title, poster: e.poster, items: [e], credits: e.credits }))
  }, [])

  return (
    <div className="center-viewport">
      <div className="grid">
        {projects.map((project) => {
          const cat = EDIT_CATEGORIES[project.title] || 'music'
          const dim = (filter === 'commercial' && cat !== 'commercial') || (filter === 'music' && cat !== 'music')
          return (
          <div key={project.id} className="grid-item" style={{ opacity: dim ? 0.35 : 1, transition: 'opacity 160ms ease' }}>
            <button className="grid-thumb" onClick={() => setActive(project)} aria-label={`Open ${project.title}`}>
              {project.poster ? (
                <img src={project.poster} alt="" loading="lazy" />
              ) : (
                // If no poster, try to draw a thumbnail from the first clip
                <VideoThumb src={project.items?.[0]?.src} alt={project.title} />
              )}
            </button>
            <div className="grid-caption">{project.title}</div>
          </div>)
        })}
      </div>
      <VideoModal item={active} onClose={() => setActive(null)} />
    </div>
  )
}


