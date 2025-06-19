import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

function handleSubmit(event) {
  event.preventDefault();

  const query = input.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  showLoader();
  hideLoadMoreButton();
  clearGallery();

  getImagesByQuery(currentQuery, currentPage)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.warning({
          title: 'No Results',
          message: 'No images found. Try another query!',
          position: 'center',
        });
        return;
      }

      createGallery(data.hits);
      showLoadMoreButton();
    })
    .catch(() => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Try again later.',
        position: 'topRight',
      });
    })
    .finally(() => hideLoader());
}

function handleLoadMore() {
  currentPage += 1;

  showLoader();
  hideLoadMoreButton();

  getImagesByQuery(currentQuery, currentPage)
    .then(data => {
      createGallery(data.hits);
      showLoadMoreButton();

      // Прокручування на 2 висоти картки
      const { height: cardHeight } = document
        .querySelector('.gallery li')
        .getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    })
    .catch(() => {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong while loading more.',
        position: 'topRight',
      });
    })
    .finally(() => hideLoader());
}
