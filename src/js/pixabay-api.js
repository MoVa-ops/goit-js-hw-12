import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '50786624-1add8080b253d44feed6410de';

export function getImagesByQuery(query) {
  return axios(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  }).then(res => res.data.hits);
}
