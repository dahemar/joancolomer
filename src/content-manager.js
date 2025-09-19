/**
 * Content Manager for Joan Colomer Website
 * Integrates with Google Sheets as CMS
 */

class ContentManager {
  constructor() {
    this.apiKey = 'AIzaSyBHQgbSv588A3qr-Kzeo6YrZ9TbVNlrSkc';
    this.spreadsheetId = '1CGGPnz1xQt4Bc6SBHPU_7lOKSU8v-DzdVvCL8ipVF4Q';
    this.baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Get data from Google Sheets
   * @param {string} sheetName - Name of the sheet
   * @param {string} range - Range to fetch (e.g., 'A1:Z1000')
   * @returns {Promise<Array>} Array of objects with data
   */
  async getSheetData(sheetName, range = 'A1:Z1000') {
    const cacheKey = `${sheetName}_${range}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const url = `${this.baseUrl}/${this.spreadsheetId}/values/${sheetName}!${range}?key=${this.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const rows = data.values || [];
      
      if (rows.length === 0) {
        return [];
      }
      
      // Convert to array of objects
      const headers = rows[0];
      const result = rows.slice(1).map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index] || '';
        });
        return obj;
      });
      
      // Cache the result
      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });
      
      return result;
    } catch (error) {
      console.error(`Error fetching data from sheet ${sheetName}:`, error);
      return [];
    }
  }

  /**
   * Get all videos with their project information
   * @returns {Promise<Array>} Array of video objects
   */
  async getVideos() {
    const [videos, projects] = await Promise.all([
      this.getSheetData('videos'),
      this.getSheetData('projects')
    ]);

    // Create projects lookup
    const projectsMap = new Map();
    projects.forEach(project => {
      projectsMap.set(project.id, project);
    });

    // Filter active videos and enrich with project data
    return videos
      .filter(video => video.is_active === 'x')
      .map(video => {
        const project = projectsMap.get(video.project_id);
        return {
          ...video,
          project: project || null,
          order: parseInt(video.order) || 0
        };
      })
      .sort((a, b) => a.order - b.order);
  }

  /**
   * Get videos by category
   * @param {string} category - Category to filter by
   * @returns {Promise<Array>} Array of video objects
   */
  async getVideosByCategory(category = 'all') {
    const videos = await this.getVideos();
    
    if (category === 'all') {
      return videos;
    }
    
    return videos.filter(video => video.category === category);
  }

  /**
   * Get all projects
   * @returns {Promise<Array>} Array of project objects
   */
  async getProjects() {
    const projects = await this.getSheetData('projects');
    return projects
      .filter(project => project.is_active === 'x')
      .map(project => ({
        ...project,
        order: parseInt(project.order) || 0
      }))
      .sort((a, b) => a.order - b.order);
  }

  /**
   * Get projects by type (edits/directed)
   * @param {string} type - Type to filter by
   * @returns {Promise<Array>} Array of project objects
   */
  async getProjectsByType(type) {
    const projects = await this.getProjects();
    return projects.filter(project => project.type === type);
  }

  /**
   * Get categories
   * @returns {Promise<Array>} Array of category objects
   */
  async getCategories() {
    const categories = await this.getSheetData('categories');
    return categories
      .filter(category => category.is_active === 'x')
      .map(category => ({
        ...category,
        order: parseInt(category.order) || 0
      }))
      .sort((a, b) => a.order - b.order);
  }

  /**
   * Get settings
   * @returns {Promise<Object>} Settings object
   */
  async getSettings() {
    const settings = await this.getSheetData('settings');
    const settingsObj = {};
    settings.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });
    return settingsObj;
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Get video by ID
   * @param {string} id - Video ID
   * @returns {Promise<Object|null>} Video object or null
   */
  async getVideoById(id) {
    const videos = await this.getVideos();
    return videos.find(video => video.id === id) || null;
  }

  /**
   * Get project by ID
   * @param {string} id - Project ID
   * @returns {Promise<Object|null>} Project object or null
   */
  async getProjectById(id) {
    const projects = await this.getProjects();
    return projects.find(project => project.id === id) || null;
  }

  /**
   * Get videos by project ID
   * @param {string} projectId - Project ID
   * @returns {Promise<Array>} Array of video objects
   */
  async getVideosByProject(projectId) {
    const videos = await this.getVideos();
    return videos.filter(video => video.project_id === projectId);
  }
}

// Create global instance
window.contentManager = new ContentManager();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContentManager;
}
