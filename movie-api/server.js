const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));

let movies = [
    { id: 1, title: "Inception", director: "Christopher Nolan", releaseDate: "2010-07-16", genre: "Sci-Fi", rating: 9 },
    { id: 2, title: "The Matrix", director: "Lana Wachowski, Lilly Wachowski", releaseDate: "1999-03-31", genre: "Action", rating: 9 }
];

app.get('/movies', (req, res) => {
    res.json(movies);
});

app.post('/movies', (req, res) => {
    const newMovie = { id: movies.length ? movies[movies.length - 1].id + 1 : 1, ...req.body };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.delete('/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    movies = movies.filter(movie => movie.id !== id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
