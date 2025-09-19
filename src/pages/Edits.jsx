import { useMemo, useState, useEffect } from 'react'
import VideoModal from '../components/VideoModal'
import { editsProjects as loaded } from '../data/loadEdits'
import { edits as fallback } from '../data/videos'
import { getVideosByCategoryFromCMS, loadCategoriesFromCMS } from '../data/loadEditsCMS'
import VideoThumb from '../components/VideoThumb'
import { EDIT_CATEGORIES } from '../data/categories'
import { useSearchParams } from 'react-router-dom'

export default function Edits() {
  const [active, setActive] = useState(null)
  const [params, setParams] = useSearchParams()
  const [cmsProjects, setCmsProjects] = useState([])
  const [cmsCategories, setCmsCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const filter = params.get('f') || 'all'
  
  // Load data from CMS
  useEffect(() => {
    const loadCMSData = async () => {
      try {
        setLoading(true)
        const [projects, categories] = await Promise.all([
          getVideosByCategoryFromCMS(filter),
          loadCategoriesFromCMS()
        ])
        setCmsProjects(projects)
        setCmsCategories(categories)
      } catch (error) {
        console.error('Error loading CMS data:', error)
        // Fallback to static data
        setCmsProjects([])
        setCmsCategories([])
      } finally {
        setLoading(false)
      }
    }
    
    loadCMSData()
  }, [filter])
  
  const projects = useMemo(() => {
    // Use CMS data if available, otherwise fallback to static data
    if (cmsProjects.length > 0) {
      return cmsProjects
    }
    
    return loaded && loaded.length
      ? loaded
      : fallback.map((e) => ({ id: e.id, title: e.title, poster: e.poster, items: [e], credits: e.credits }))
  }, [cmsProjects, loaded, fallback])
  
  const categories = useMemo(() => {
    // Use CMS categories if available, otherwise fallback to static categories
    if (cmsCategories.length > 0) {
      return cmsCategories.map(cat => ({
        id: cat.id,
        name: cat.name,
        displayName: cat.display_name
      }))
    }
    
    return EDIT_CATEGORIES
  }, [cmsCategories])

  if (loading) {
    return (
      <div className="center-viewport">
        <div className="loading">
          <p>Loading content...</p>
        </div>
      </div>
    )
  }

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


