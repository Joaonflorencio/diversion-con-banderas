document.addEventListener('DOMContentLoaded', () => {
    fetchCountries();
});

async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3/all');
        const countries = await response.json();
        displayCountries(countries.sort((a, b) => a.name.common.localeCompare(b.name.common, 'en', { sensitivity: 'base' })));
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

function displayCountries(countries) {
    const countriesList = document.getElementById('countries-list');
    countriesList.innerHTML = ''; 

    countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.className = 'country-item';
        countryDiv.innerHTML = `
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
            <p>${country.name.common}</p>
        `;
        countryDiv.addEventListener('click', () => showCountryDetails(country));
        countriesList.appendChild(countryDiv);
    });
}

function showCountryDetails(country) {
    
    console.log('Mostrando detalles para:', country.name.common);
    
}
