const _ = require('lodash');

import fetchCountries from './fetchCountries.js'
import '../node_modules/@pnotify/core/dist/Angeler.css'
import '../node_modules/@pnotify/core/dist/BrightTheme.css'
import '../node_modules/@pnotify/core/dist/Material.css'
import '../node_modules/@pnotify/core/dist/PNotify.css'
import './styles.css';


let searchQuery = '';
const URL = `https://restcountries.eu/rest/v2/name/`;
const input = document.querySelector('.finder');

input.addEventListener('input', _.debounce((event) => {
    fetchCountries(event,searchQuery,URL)
}),500)



