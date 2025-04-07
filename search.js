const api_key = '2ef7a2b3a52b4e7fadc174847250304';

async function fetchCityName() {
    const in_city = document.getElementById('city').value;
    const searchResults = document.querySelector('.search-results');
    
    if (in_city.length < 3) {
        searchResults.innerHTML = '';
        return;
    }

    try {
        let URL = `http://api.weatherapi.com/v1/search.json?key=${api_key}&q=${in_city}`;
        const response = await fetch(URL);
        const data = await response.json();
        
        // Clear previous results
        searchResults.innerHTML = '';
        
        // Add new results
        data.forEach(city => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `${city.name}, ${city.country}`;
            
            // Add click event to each result
            resultItem.addEventListener('click', () => {
                document.getElementById('city').value = city.name;
                searchResults.innerHTML = ''; // Clear results after selection
                fetchWeather(); // Call the weather fetch function
            });
            
            searchResults.appendChild(resultItem);
        });
    } catch (error) {
        console.error("Error fetching cities:", error);
    }
}

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add event listener with debouncing
document.getElementById('city').addEventListener('input', debounce(fetchCityName, 300));

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search')) {
        document.querySelector('.search-results').innerHTML = '';
    }
});
