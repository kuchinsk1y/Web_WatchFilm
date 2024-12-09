
const apiKey = 'd0228541'
const searchInput = document.getElementById('searchInput')
const searchResults = document.getElementById('searchResults')

function debounce(func, delay) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
}

async function fetchMovies(query, isPopular = false) {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=movie`)
      const data = await response.json()
      if (data.Response === 'True') {
        displayResults(data.Search, isPopular)
      } else if (!isPopular) {
        displayResults([])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
}
  
function displayResults(movies, isPopular = false) {
    searchResults.innerHTML = ''
    if (movies.length === 0) {
        searchResults.innerHTML = `<p class="p-2 text-gray-400">No results found.</p>`
        searchResults.classList.remove('hidden')
        return
    }
    
    searchResults.classList.remove('hidden')
    searchResults.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4'
    
    movies.forEach((movie) => {
        const movieCard = document.createElement('div')
        movieCard.className = 'flex flex-col items-center text-center transition duration-300 transform hover:scale-105 hover:shadow-lg slide-up'
    
        movieCard.innerHTML = `
          <div class="w-full h-48 overflow-hidden rounded-lg mb-3">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}" class="w-full h-full object-contain">
          </div>
          <h3 class="text-sm font-semibold text-yellow-400">${movie.Title}</h3>
          <p class="text-xs text-gray-400">${movie.Year}</p>
        `
    
        searchResults.appendChild(movieCard)
    })
}
  

function loadPopularMovies() {
  fetchMovies('Star Wars', true)
}

searchInput.addEventListener('input', debounce(() => {
  const query = searchInput.value.trim()
  if (query.length > 1) {
    fetchMovies(query)
  } else {
    loadPopularMovies()
  }
}, 300))

document.addEventListener('DOMContentLoaded', () => {
    loadPopularMovies()
    const navbarToggle = document.getElementById('navbar-toggle')
    const mobileNavbar = document.getElementById('mobile-navbar')

    navbarToggle.addEventListener('click', function () {
        mobileNavbar.classList.toggle('hidden')
    })
})

