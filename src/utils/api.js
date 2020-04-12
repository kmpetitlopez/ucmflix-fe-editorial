import axios from 'axios'

export default {

  getContents (params) {
    return axios.get('/contents', {
        params
      })
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getContent (id) {
    return axios.get('/contents/' + id)
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getContentCategories (id) {
    return axios.get('/contents/' + id + '/categories')
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getContentWithoutCategories () {
    return axios.get('/contents/empty-categories')
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getContentImage (id) {
    return axios.get('/contents/' + id + '/image')
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getContentVodEvents (id) {
    return axios.get('/contents/' + id + '/vod-events')
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getContentEpisodes (id, args) {
    return axios.get('/contents/' + id + '/episodes', {
      param: args
    })
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getContentSeasons (id) {
    return axios.get('/contents/' + id + '/seasons')
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getCategories (params) {
    return axios.get('/categories', {
      params
    })
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getCategory (id) {
    return axios.get('/categories/' + id)
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getCategoryContents (id, params) {
    return axios.get('/categories/' + id + '/contents', {
        params
      })
      .then(response => {
        return response.data  && response.data.response
      })
  },

  createCategory (body) {
    return axios.post('/categories', body)
      .then(response => {
        return response.data  && response.data.response
      })
  },
  
  updateCategory (id, body) {
    return axios.put('/categories/' + id , body)
      .then(response => {
        return response.data  && response.data.response
      })
  },
  
  deleteCategory (id) {
    return axios.delete('/categories/' + id )
      .then(response => {
        return response.data  && response.data.response
      })
  },
  
  createCategoryReference (body) {
    return axios.post('/category-references', body)
      .then(response => {
        return response.data  && response.data.response
      })
  },

  deleteCategoryReference (params) {
    return axios.delete('/category-references', {
      params
    })
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getCategoryReferences (params) {
    return axios.get('/category-references', {
      params
    })
      .then(response => {
        return response.data  && response.data.response
      })
  },

  createContent (body) {
    return axios.post('/contents', body)
      .then(response => {
        return response.data  && response.data.response
      })
  },
  
  updateContent (id, body) {
    return axios.put('/contents/' + id , body)
      .then(response => {
        return response.data  && response.data.response
      })
  },

  deleteContent (id) {
    return axios.delete('/contents/' + id )
      .then(response => {
        return response.data  && response.data.response
      })
  },
  
  createVodEvent (body) {
    return axios.post('/vod-events', body)
      .then(response => {
        return response.data  && response.data.response
      })
  },

  deleteVodEvent (id) {
    return axios.delete('/vod-events/' + id )
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getImages (params) {
    return axios.get('/images', {
      params
    })
      .then(response => {
        return response.data  && response.data.response
      })
  },

  getImage (id) {
    return axios.get('/images/' + id)
      .then(response => {
        return response.data  && response.data.response
      })
  },

  createImage (body) {
    return axios.post('/images', body)
      .then(response => {
        return response.data  && response.data.response
      })
  },

  deleteImage (id) {
    return axios.delete('/images/' + id )
      .then(response => {
        return response.data  && response.data.response
      })
  },

  updateImage (id, body) {
    return axios.put('/images/' + id , body)
      .then(response => {
        return response.data  && response.data.response
      })
  },
}
