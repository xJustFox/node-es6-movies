const mediaCollection = [
    {
        title: "Inception",
        year: 2010,
        genre: "Sci-Fi",
        rating: 8.8,
        type: "film"
    },
    {
        title: "Breaking Bad",
        year: 2008,
        genre: "Crime",
        rating: 9.5,
        type: "serie tv",
        seasons: 5
    },
    {
        title: "The Dark Knight",
        year: 2008,
        genre: "Action",
        rating: 9.0,
        type: "film"
    },
    {
        title: "Stranger Things",
        year: 2016,
        genre: "Fantasy",
        rating: 8.7,
        type: "serie tv",
        seasons: 4
    },
    {
        title: "Interstellar",
        year: 2014,
        genre: "Adventure",
        rating: 8.6,
        type: "film"
    },
    {
        title: "Game of Thrones",
        year: 2011,
        genre: "Fantasy",
        rating: 9.2,
        type: "serie tv",
        seasons: 8
    }
];

class Movie {
    #title
    #year
    #genre
    #rating
    #type

    constructor(title, year, genre, rating, type) {
        this.#title = title;
        this.#year = year;
        this.#genre = genre;
        this.#rating = rating;
        this.#type = type;
    }

    toString() {
        return `${this.#title} è un ${this.#type} di genere ${this.#genre}. E' stato rilasciato nel ${this.#year} ed ha un voto di ${this.#rating}`
    }

    // Metodi getter per accedere alle proprietà private
    getTitle() {
        return this.#title;
    }

    getYear() {
        return this.#year;
    }

    getGenre() {
        return this.#genre;
    }

    getRating() {
        return this.#rating;
    }

    getType() {
        return this.#type;
    }
}

class TvSerie extends Movie {
    #seasons

    constructor(title, year, genre, rating, type, seasons) {
        super(title, year, genre, rating, type);

        this.#seasons = seasons;
    }

    toString() {
        return `${this.getTitle()} è una ${this.getType()} di genere ${this.getGenre()}. La prima stagione è stata rilasciata nel ${this.getYear()} ed in totale sono state prodotte ${this.#seasons} stagioni. Ha un voto di ${this.getRating()}.`;
    }

}

// const movie = new Movie("The Matrix", 1999, "Action", 8.7, "film");

// console.log(movie.toString());

// const tvSerie = new TvSerie("The Mandalorian", 2019, "Fantasy", 8.7, "serie tv", 3)

// console.log(tvSerie.toString());

const newMediaCollection = mediaCollection.map((obj) => {
    if (obj.type === "film") {
        return new Movie(obj.title, obj.year, obj.genre, obj.rating, obj.type);
    }
    return new TvSerie(obj.title, obj.year, obj.genre, obj.rating, obj.type, obj.seasons);
});

// newMediaCollection.forEach(element => {
//     console.log(element.toString());
// });

const averageRating = (genre) => {
    const ratings = [];

    mediaCollection.forEach(obj => {
        if (obj.genre.toLocaleLowerCase() === genre.toLocaleLowerCase()) {
            ratings.push(obj.rating);
        };
    });

    let sum = 0;
    ratings.forEach(num => { sum += num });

    return sum / Number(ratings.length);
}

// console.log(averageRating("Fantasy"));

const genresFilm = () => {
    const genres = [];

    mediaCollection.forEach(obj => {genres.includes(obj.genre) ? "" : genres.push(obj.genre)});

    return genres
}

console.log(genresFilm());

