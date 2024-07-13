const apiUrl = '/movies'; // The API endpoint on the same server

async function fetchMovies() {
    const response = await fetch(apiUrl);
    const movies = await response.json();
    displayMovies(movies);
}

function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '<h2>Movie List</h2>';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie';
        movieElement.innerHTML = `
            <h3>${movie.title}</h3>
            <p>Director: ${movie.director}</p>
            <p>Release Date: ${movie.releaseDate}</p>
            <p>Genre: ${movie.genre}</p>
            <p>Rating: ${movie.rating}</p>
            <button onclick="deleteMovie(${movie.id})">Delete</button>
        `;
        movieList.appendChild(movieElement);
    });
}

async function addMovie() {
    const title = document.getElementById('title').value;
    const director = document.getElementById('director').value;
    const releaseDate = document.getElementById('release-date').value;
    const watchDate = document.getElementById('watch-date').value;
    const category = document.getElementById('category').value;
    const rating = document.getElementById('rating').value;
    const review = document.getElementById('review').value;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, director, releaseDate, watchDate, category, rating, review })
    });

    if (response.ok) {
        fetchMovies();
    }
}

async function deleteMovie(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        fetchMovies();
    }
}

fetchMovies();
