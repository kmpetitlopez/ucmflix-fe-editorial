import axios from 'axios'

export default {

  buildQuery(args) {
    let query = '?',
      tmp = [];

    for (const arg of args) {
        for (const property in arg) {
          const value = property + '=' + arg[property];
          tmp.push(value);
        }
    }

    query += tmp.join('&');

    return query;
  },

  getContents (args) {
    let query = '';

    if (args && args.length) {
      query = this.buildQuery(args);
    }

    return axios.get('/contents' + query)
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

  getContentEpisodes (id, args) {
    let query = '';

    if (args && args.length) {
      query = this.buildQuery(args);
    }

    return axios.get('/contents/' + id + '/episodes' + query)
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

  getCategories (args) {
    let query = '';

    if (args && args.length) {
      query = this.buildQuery(args);
    }

    return axios.get('/categories' + query)
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

  getCategoryContents (id, args) {
    let query = '';

    if (args && args.length) {
      query = this.buildQuery(args);
    }

    return axios.get('/categories/' + id + '/contents' + query)
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
}
