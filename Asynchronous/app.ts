document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById("search-btn") as HTMLButtonElement;
    const countryInp = document.getElementById("country-inp") as HTMLInputElement;
    const result = document.getElementById("result") as HTMLDivElement;;

    searchBtn.addEventListener("click", () => {
        const countryName = countryInp.value;

        fetchCountryData(countryName)
            .then(data => {
                result.innerHTML = `
                    <img src="${data[0].flags.svg}" class="flag-img">
                    <h2>${data[0].name.common}</h2>
                    <div class="wrapper">
                        <div class="data-wrapper">
                            <h4>Capital:</h4>
                            <span>${data[0].capital[0]}</span>
                        </div>
                    </div>
                `;
            })
            .catch(error => {
                if (countryName.length === 0) {
                    result.innerHTML = `<h3>The input field cannot be empty</h3>`;
                } else {
                    result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
                }
            });
    });

    function fetchCountryData(countryName: string): any {
        const finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
        return fetch(finalURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                throw new Error(error.message);
            });
    }
});
