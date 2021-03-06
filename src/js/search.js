import countrySearch from './fetchCountries.js';
import getRefs from './getRefs';
import countryCard from '../templates/countryCard.hbs';
import countryList from '../templates/countryList.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import debounce from 'lodash.debounce';
const refs = getRefs();

refs.form.addEventListener('input', debounce(searchInputHandler, 500));

function searchInputHandler(e) {
  e.preventDefault();
  clearCountries();
  const searchQuery = e.target.value;
  if (!searchQuery) {
    return;
  }
  countrySearch
    .fetchCountry(searchQuery)
    .then(data => {
      if (data.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific name!',
        });
      } else if (data.status === 404) {
        error({
          text: 'No country has been found. Please enter a more specific name!',
        });
      } else if (data.length === 1) {
        createListMarkup(data, countryCard);
      } else if (data.length <= 10) {
        createListMarkup(data, countryList);
      }
    })
    .catch(err => {
      error({ text: 'Empty request!', delay: 1500 });
    });
}

function createListMarkup(countries, template) {
  const markup = countries.map(country => template(country)).join('');
  refs.countryCard.insertAdjacentHTML('afterbegin', markup);
}

function clearCountries() {
  refs.countryCard.innerHTML = '';
}
