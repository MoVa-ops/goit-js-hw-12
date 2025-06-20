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
const loadMoreBtn = document.querySelector('.button-more');

let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', handleSubmit);

async function handleSubmit(hole) {
  hole.preventDefault();

  const query = input.value.trim();

  if (!query) {
    notifyError('Please enter a search query.');
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      notifyWarning('Sorry, no images match your query.');
      return;
    }

    createGallery(data.hits);

    // console.log(data);
    if (currentPage * 15 >= data.totalHits) {
      hideLoadMoreButton();
      notifyInfo("We're sorry, but you've reached the end of search results.");
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    notifyError('Something went wrong. Try again later.');
  } finally {
    hideLoader();
  }
}

loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleLoadMore() {
  currentPage += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);
    smoothScrollAfterLoad();

    if (currentPage * 15 >= data.totalHits) {
      hideLoadMoreButton();
      notifyInfo("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    notifyError('Something went wrong. Try again later.');
  } finally {
    hideLoader();
  }
}

function smoothScrollAfterLoad() {
  const firstCard = document.querySelector('.gallery-item');
  if (!firstCard) return;

  const cardHeight = firstCard.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

const notifyError = message =>
  iziToast.error({ title: 'Error', message, position: 'topRight' });

const notifyWarning = message =>
  iziToast.warning({ title: 'Warning', message, position: 'center' });

const notifyInfo = message =>
  iziToast.info({ title: 'Info', message, position: 'topRight' });
