const {error} = require('@pnotify/core');
import singleCountry from './templates/countries.hbs';
import listOfCountry from './templates/list-country.hbs';


const fetchCountries = (event, searchQuery, URL) => {
    const output = document.getElementById('country-box');
    if (event.target.value.length > 2) {
        searchQuery = event.target.value;
        output.innerHTML = '';

        fetch(`${URL}${searchQuery}`).then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 404) {
                error({
                    text: "Error message: 404. Country not found"
                })
            }
            else if (response.status === 500) {
                error({
                    text: "Error message: 500. Server Error - сайт хакнули)) "
                })
            }
            else {
                error({
                    text: "Not found", title: 'Not found', delay: 1500
                })
            };
        })
        .then(data => {
            if (data.length > 2 && data.length < 11) {
                const countries = listOfCountry(data);
                output.insertAdjacentHTML('afterbegin', countries);
            } else if (data.length === 1) {
                const country = singleCountry(data);
                output.innerHTML = country;
                
            } else {
                error({
                    text: "Too many matches found. Please enter a more specific query!", delay: 1500
                })
            };
        })
        .catch(err => { error({ text: err, delay: 1500 }) });
        
    } else if (event.target.value.length === 0) {
        error({
            text: "Empty request!", delay: 1500
        })
    };    
}
    export default fetchCountries;