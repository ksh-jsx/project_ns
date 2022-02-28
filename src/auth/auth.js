import { post } from 'axios';

export function auth({ formData }) {
  var user = '';
  const url = '/api/auth/login';  
  const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }

  post(url, formData, config)
    .then((response) => {
      user = response.data
      
    })
    
  return user
}