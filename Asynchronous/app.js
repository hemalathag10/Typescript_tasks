document.addEventListener('DOMContentLoaded', function () {
    var searchBtn = document.getElementById("search-btn");
    var countryInp = document.getElementById("country-inp");
    var result = document.getElementById("result");
    ;
    searchBtn.addEventListener("click", function () {
        var countryName = countryInp.value;
        fetchCountryData(countryName)
            .then(function (data) {
            result.innerHTML = "\n                    <img src=\"".concat(data[0].flags.svg, "\" class=\"flag-img\">\n                    <h2>").concat(data[0].name.common, "</h2>\n                    <div class=\"wrapper\">\n                        <div class=\"data-wrapper\">\n                            <h4>Capital:</h4>\n                            <span>").concat(data[0].capital[0], "</span>\n                        </div>\n                    </div>\n                ");
        })
            .catch(function (error) {
            if (countryName.length === 0) {
                result.innerHTML = "<h3>The input field cannot be empty</h3>";
            }
            else {
                result.innerHTML = "<h3>Please enter a valid country name.</h3>";
            }
        });
    });
    function fetchCountryData(countryName) {
        var finalURL = "https://restcountries.com/v3.1/name/".concat(countryName, "?fullText=true");
        return fetch(finalURL)
            .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .catch(function (error) {
            throw new Error(error.message);
        });
    }
});
