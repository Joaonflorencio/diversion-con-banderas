document.addEventListener('DOMContentLoaded', () => {
    getCountries()
      .then(countries => displayCountries(countries))
      .catch(error => console.error('Error fetching or displaying countries:', error));
  });
  
  async function getCountries() {
    try {
      const response = await fetch('https://restcountries.com/v3/all');
      const countries = await response.json();
      const sortedCountries = sortCountriesAlphabetically(countries);
      return sortedCountries;
    } catch (error) {
      throw error;
    }
  }
  
  function sortCountriesAlphabetically(countries) {
    return countries.sort((a, b) => {
      const nameA = a.name.common.toUpperCase();
      const nameB = b.name.common.toUpperCase();
      return nameA.localeCompare(nameB);
    });
  }
  
  // function displayCountries(countries) {
  //   const countriesList = document.getElementById('countries-list');
  //   countriesList.innerHTML = '';
  
  //   if (countries.length === 0) {
  //     countriesList.innerHTML = 'No se encontraron países.';
  //     return;
  //   }
  
  //   // const countriesHTML = countries.map(country => `
  //   //   <div class="country">
  //   //     <img src="${country.flags[0]}" alt="${country.name.common} flag">
  //   //     <h2>${country.name.common}</h2>
  //   //   </div>
  //   // `).join('');
  
  //   countriesList.innerHTML = countriesHTML;
  
  //   countries.forEach((country, index) => {
  //     const countryElement = document.querySelectorAll('.country')[index];
  //     countryElement.addEventListener('click', () => {
  //       showCountryInfo(country);
  //     });
  //   });
  // }
  function displayCountries(countries) {
    const countriesList = document.getElementById('countries-list');
    countriesList.innerHTML = '';
  
    if (countries.length === 0) {
      countriesList.innerHTML = 'No se encontraron países.';
      return;
    }
  
    countries.forEach(country => {
      const countryHTML = `
        <div class="country">
          <img src="${country.flags[0]}" alt="${country.name.common} flag">
          <h2>${country.name.common}</h2>
        </div>
      `;
      
      countriesList.innerHTML += countryHTML;
    });
  
    countries.forEach((country, index) => {
      const countryElement = document.querySelectorAll('.country')[index];
      countryElement.addEventListener('click', () => {
        showCountryInfo(country);
      });
    });
  }
  
  function showCountryInfo(country) {
    const countryInfoElement = document.getElementById('country-info');
    console.log(country)
    const countryInfoHTML = `
    <div class="container-info">
      <img src="${country.flags[0]}" alt="${country.name.common} flag">
      <div>
        <h2>${country.name.common}</h2>
        <p>Capital: ${country.capital}</p>
        <p>Población: ${country.population}</p>
        <p>Lado de la carretera: ${country.car.side}</p>
      </div>
    </div>
    <button class="close" onclick="hideCountryInfo()">Cerrar</button>
    `;
    countryInfoElement.innerHTML = countryInfoHTML;
    countryInfoElement.classList.remove('hidden');
  }
  
  function hideCountryInfo() {
    const countryInfoElement = document.getElementById('country-info');
    countryInfoElement.classList.add('hidden');
  }