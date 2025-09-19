// CMS-powered video loading using Google Sheets
// This replaces the static loadEdits.js with dynamic content management

import { contentManager } from '../content-manager.js'

/**
 * Load videos from Google Sheets CMS
 * @returns {Promise<Array>} Array of project objects with videos
 */
export async function loadVideosFromCMS() {
  try {
    const videos = await contentManager.getVideos();
    const projects = await contentManager.getProjects();
    
    // Group videos by project
    const projectsMap = new Map();
    
    // Initialize projects
    projects.forEach(project => {
      projectsMap.set(project.id, {
        id: project.id,
        title: project.title,
        description: project.description,
        type: project.type,
        items: [],
        poster: null,
        credits: '',
        order: project.order
      });
    });
    
    // Add videos to their projects
    videos.forEach(video => {
      const project = projectsMap.get(video.project_id);
      if (project) {
        project.items.push({
          src: video.video_url,
          type: 'video',
          title: video.title,
          description: video.description,
          credits: video.credits
        });
        
        // Set poster from first video or dedicated poster
        if (!project.poster && video.poster_url) {
          project.poster = video.poster_url;
        }
      }
    });
    
    // Convert to array and sort by order
    return Array.from(projectsMap.values())
      .filter(project => project.items.length > 0)
      .sort((a, b) => a.order - b.order);
      
  } catch (error) {
    console.error('Error loading videos from CMS:', error);
    return [];
  }
}

/**
 * Load categories from CMS
 * @returns {Promise<Array>} Array of category objects
 */
export async function loadCategoriesFromCMS() {
  try {
    return await contentManager.getCategories();
  } catch (error) {
    console.error('Error loading categories from CMS:', error);
    return [];
  }
}

/**
 * Load settings from CMS
 * @returns {Promise<Object>} Settings object
 */
export async function loadSettingsFromCMS() {
  try {
    return await contentManager.getSettings();
  } catch (error) {
    console.error('Error loading settings from CMS:', error);
    return {};
  }
}

/**
 * Get videos by category from CMS
 * @param {string} category - Category to filter by
 * @returns {Promise<Array>} Array of project objects
 */
export async function getVideosByCategoryFromCMS(category = 'all') {
  try {
    const videos = await contentManager.getVideosByCategory(category);
    const projects = await contentManager.getProjects();
    
    // Group videos by project
    const projectsMap = new Map();
    
    // Initialize projects
    projects.forEach(project => {
      projectsMap.set(project.id, {
        id: project.id,
        title: project.title,
        description: project.description,
        type: project.type,
        items: [],
        poster: null,
        credits: '',
        order: project.order
      });
    });
    
    // Add videos to their projects
    videos.forEach(video => {
      const project = projectsMap.get(video.project_id);
      if (project) {
        project.items.push({
          src: video.video_url,
          type: 'video',
          title: video.title,
          description: video.description,
          credits: video.credits
        });
        
        // Set poster from first video or dedicated poster
        if (!project.poster && video.poster_url) {
          project.poster = video.poster_url;
        }
      }
    });
    
    // Convert to array and sort by order
    return Array.from(projectsMap.values())
      .filter(project => project.items.length > 0)
      .sort((a, b) => a.order - b.order);
      
  } catch (error) {
    console.error('Error loading videos by category from CMS:', error);
    return [];
  }
}

/**
 * Get projects by type from CMS (for directed page)
 * @param {string} type - Type to filter by (e.g., 'commercial', 'music')
 * @returns {Promise<Array>} Array of project objects
 */
export async function getProjectsByTypeFromCMS(type) {
  try {
    const projects = await contentManager.getProjectsByType(type);
    const videos = await contentManager.getVideos();
    
    // Group videos by project
    const projectsMap = new Map();
    
    // Initialize projects
    projects.forEach(project => {
      projectsMap.set(project.id, {
        id: project.id,
        title: project.title,
        description: project.description,
        type: project.type,
        items: [],
        poster: null,
        credits: '',
        order: project.order
      });
    });
    
    // Add videos to their projects
    videos.forEach(video => {
      const project = projectsMap.get(video.project_id);
      if (project) {
        project.items.push({
          src: video.video_url,
          type: 'video',
          title: video.title,
          description: video.description,
          credits: video.credits
        });
        
        // Set poster from first video or dedicated poster
        if (!project.poster && video.poster_url) {
          project.poster = video.poster_url;
        }
      }
    });
    
    // Convert to array and sort by order
    return Array.from(projectsMap.values())
      .filter(project => project.items.length > 0)
      .sort((a, b) => a.order - b.order);
      
  } catch (error) {
    console.error('Error loading projects by type from CMS:', error);
    return [];
  }
}
