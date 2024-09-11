const mediaCollection = require('./db.js');

class Movie {
    #title
    #year
    #genre
    #rating
    #type
    #price = 3.99;

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
    get title() {
        return this.#title;
    }

    get year() {
        return this.#year;
    }

    get genre() {
        return this.#genre;
    }

    get rating() {
        return this.#rating;
    }

    get type() {
        return this.#type;
    }

    get price() {
        return this.#price
    }
}

class TvSerie extends Movie {
    #seasons

    constructor(title, year, genre, rating, type, seasons) {
        super(title, year, genre, rating, type);

        this.#seasons = seasons;
    }

    toString() {
        return `${this.title} è una ${this.type} di genere ${this.genre}. La prima stagione è stata rilasciata nel ${this.year} ed in totale sono state prodotte ${this.#seasons} stagioni. Ha un voto di ${this.rating}.`;
    }

    get seasons () {
        return this.#seasons;
    }

}

// const movie = new Movie("The Matrix", 1999, "Action", 8.7, "film");

// console.log(movie.toString());

// const tvSerie = new TvSerie("The Mandalorian", 2019, "Fantasy", 8.7, "serie tv", 3)

// console.log(tvSerie.toString());

const newMediaCollection = mediaCollection.map((obj) => {
    if (obj.type.toLocaleLowerCase() === "film") {
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

// console.log(genresFilm());

const filmListTexts = (genre) => {
    const texts = [];
    mediaCollection.forEach(obj => {
        if (obj.genre.toLowerCase() === genre.toLowerCase()) {
            if (obj.type.toLocaleLowerCase() === "film") {
                const movie = new Movie(obj.title, obj.year, obj.genre, obj.rating, obj.type);
                texts.push(movie.toString());
            } else {
                const tvSerie = new TvSerie(obj.title, obj.year, obj.genre, obj.rating, obj.type, obj.seasons);
                texts.push(tvSerie.toString());
            }
        }
    });

    console.log(texts);
    
};

// console.log(filmListTexts("Fantasy"));

class Cart {
    #cart = [];

    addMedia(newMedia) {
        if(this.#cart.find(media => media.title === media.title)){
            return;
        }
        this.#cart.push(newMedia);
        console.log(`Hai aggiunto ${newMedia.title} al carrello!`);
    }

    removeMedia(mediaTitle) {
        this.#cart = this.#cart.filter((obj) =>  obj.title === mediaTitle);

        return `Hai totlo ${mediaTitle} dal carrello`;
    }

    totalPrice() {
        return this.#cart.length * this.#cart[0].price;
    }

    viewCart() {
        if (this.#cart.length > 0) {
            console.log("Media nel carrello:");
            this.#cart.forEach((media, index) => {
                switch (media.type.toLowerCase()) {
                    case "film":
                        console.log(`${index + 1}. ${media.title} (${media.year}) ${media.type} - ${media.genre} - Rating: ${media.rating} - Price: ${media.price}`);
                        break;
                    case "serie tv":
                        console.log(`${index + 1}. ${media.title} (${media.year}) ${media.type} - ${media.genre} - Seasones: ${media.seasons} - Rating: ${media.rating} - Price: ${media.price}`);
                        break
                    default:
                        break;
                }
            });
        } else {
            console.log("Il carrello è vuoto.");
        }
    }
}

const media1 = new Movie("The Matrix", 1999, "Action", 8.7, "film")
const media2 = new TvSerie("Game of Thrones", 2011, "Fantasy", 9.2, "serie tv", 8)

const cart = new Cart();

console.log(cart.addMedia(media1));
console.log(cart.addMedia(media2));


console.log(cart.viewCart());
console.log(cart.totalPrice());

console.log(cart.removeMedia("The Matrix"));

console.log(cart.viewCart());
console.log(cart.totalPrice());






