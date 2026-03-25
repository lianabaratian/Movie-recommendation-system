export const mockMovies = [
  {
    id: 1, title: "Inception", year: 2010, genre: "Sci-Fi, Thriller", rating: 8.8, duration: "2h 28m",
    director: "Christopher Nolan", actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
    plot: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "https://placehold.co/200x300/1a1a2e/fff?text=Inception",
  },
  {
    id: 2, title: "The Dark Knight", year: 2008, genre: "Action, Crime, Drama", rating: 9.0, duration: "2h 32m",
    director: "Christopher Nolan", actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
    plot: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.",
    poster: "https://placehold.co/200x300/1a1a2e/fff?text=Dark+Knight",
  },
  {
    id: 3, title: "Interstellar", year: 2014, genre: "Sci-Fi, Drama", rating: 8.6, duration: "2h 49m",
    director: "Christopher Nolan", actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://placehold.co/200x300/1a1a2e/fff?text=Interstellar",
  },
  {
    id: 4, title: "Parasite", year: 2019, genre: "Thriller, Drama", rating: 8.5, duration: "2h 12m",
    director: "Bong Joon-ho", actors: "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
    plot: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    poster: "https://placehold.co/200x300/1a1a2e/fff?text=Parasite",
  },
  {
    id: 5, title: "The Shawshank Redemption", year: 1994, genre: "Drama", rating: 9.3, duration: "2h 22m",
    director: "Frank Darabont", actors: "Tim Robbins, Morgan Freeman, Bob Gunton",
    plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster: "https://placehold.co/200x300/1a1a2e/fff?text=Shawshank",
  },
  {
    id: 6, title: "Pulp Fiction", year: 1994, genre: "Crime, Drama", rating: 8.9, duration: "2h 34m",
    director: "Quentin Tarantino", actors: "John Travolta, Uma Thurman, Samuel L. Jackson",
    plot: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    poster: "https://placehold.co/200x300/1a1a2e/fff?text=Pulp+Fiction",
  },
  {
    id: 7, title: "The Godfather", year: 1972, genre: "Crime, Drama", rating: 9.2, duration: "2h 55m",
    director: "Francis Ford Coppola", actors: "Marlon Brando, Al Pacino, James Caan",
    plot: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
    poster: "https://placehold.co/200x300/1a1a2e/fff?text=Godfather",
  },
  {
    id: 8, title: "The Matrix", year: 1999, genre: "Sci-Fi, Action", rating: 8.7, duration: "2h 16m",
    director: "The Wachowskis", actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
    plot: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    poster: "https://placehold.co/200x300/1a1a2e/fff?text=The+Matrix",
  },
  {
    id: 9, title: "Fight Club", year: 1999, genre: "Drama, Thriller", rating: 8.8, duration: "2h 19m",
    director: "David Fincher", actors: "Brad Pitt, Edward Norton, Helena Bonham Carter",
    plot: "An insomniac office worker and a soap salesman build a global organization to help vent male aggression.",
    poster: "https://placehold.co/200x300/1a1a2e/fff?text=Fight+Club",
  },
  {
    id: 10, title: "Goodfellas", year: 1990, genre: "Crime, Drama", rating: 8.7, duration: "2h 26m",
    director: "Martin Scorsese", actors: "Ray Liotta, Robert De Niro, Joe Pesci",
    plot: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
    poster: "https://placehold.co/200x300/1a1a2e/fff?text=Goodfellas",
  },
]

export const mockComments = {
  1: [
    { id: 1, user: "alex_m",  avatar: "A", rating: 5, text: "Mind-blowing concept, watched it 3 times and still find new details!", date: "2 days ago" },
    { id: 2, user: "sara_k",  avatar: "S", rating: 4, text: "Great film but the ending left me confused for days.", date: "1 week ago" },
    { id: 3, user: "john_d",  avatar: "J", rating: 5, text: "One of the best sci-fi movies ever made. Nolan is a genius.", date: "2 weeks ago" },
  ],
  2: [
    { id: 1, user: "mike_r",  avatar: "M", rating: 5, text: "Heath Ledger's Joker is the best villain in cinema history.", date: "3 days ago" },
    { id: 2, user: "lena_v",  avatar: "L", rating: 5, text: "Perfect movie. Every scene is iconic.", date: "5 days ago" },
  ],
  3: [
    { id: 1, user: "omar_b",  avatar: "O", rating: 4, text: "Beautiful visuals and emotional story. Hans Zimmer's score is incredible.", date: "1 day ago" },
    { id: 2, user: "nina_p",  avatar: "N", rating: 3, text: "Great movie but a bit too long. Still worth watching.", date: "3 days ago" },
  ],
  4: [
    { id: 1, user: "chris_w", avatar: "C", rating: 5, text: "Bong Joon-ho is a masterclass director. Every frame is intentional.", date: "1 week ago" },
  ],
  5: [
    { id: 1, user: "ella_f",  avatar: "E", rating: 5, text: "The most powerful ending in movie history. Cried every time.", date: "4 days ago" },
    { id: 2, user: "tom_h",   avatar: "T", rating: 5, text: "Morgan Freeman's narration alone makes this a 10/10.", date: "1 week ago" },
  ],
  6: [
    { id: 1, user: "dave_s",  avatar: "D", rating: 5, text: "Tarantino's best. Every dialogue scene is perfection.", date: "2 days ago" },
  ],
  7: [
    { id: 1, user: "rose_m",  avatar: "R", rating: 5, text: "Timeless masterpiece. Al Pacino and Brando are unreal.", date: "6 days ago" },
    { id: 2, user: "ben_t",   avatar: "B", rating: 5, text: "The best movie ever made, full stop.", date: "2 weeks ago" },
  ],
}

export const mockTrending = [
  { id: 2,  title: "The Dark Knight",          year: 2008, genre: "Action, Crime",    rating: 9.0, poster: "https://placehold.co/200x300/1a1a2e/fff?text=Dark+Knight"  },
  { id: 1,  title: "Inception",                year: 2010, genre: "Sci-Fi, Thriller", rating: 8.8, poster: "https://placehold.co/200x300/1a1a2e/fff?text=Inception"     },
  { id: 4,  title: "Parasite",                 year: 2019, genre: "Thriller, Drama",  rating: 8.5, poster: "https://placehold.co/200x300/1a1a2e/fff?text=Parasite"      },
  { id: 6,  title: "Pulp Fiction",             year: 1994, genre: "Crime, Drama",     rating: 8.9, poster: "https://placehold.co/200x300/1a1a2e/fff?text=Pulp+Fiction"  },
  { id: 7,  title: "The Godfather",            year: 1972, genre: "Crime, Drama",     rating: 9.2, poster: "https://placehold.co/200x300/1a1a2e/fff?text=Godfather"     },
  { id: 8,  title: "The Matrix",               year: 1999, genre: "Sci-Fi, Action",   rating: 8.7, poster: "https://placehold.co/200x300/1a1a2e/fff?text=The+Matrix"    },
]

export const mockRecentlyAdded = [
  { id: 5,  title: "The Shawshank Redemption", year: 1994, genre: "Drama",            rating: 9.3, poster: "https://placehold.co/200x300/1a1a2e/fff?text=Shawshank"    },
  { id: 3,  title: "Interstellar",             year: 2014, genre: "Sci-Fi, Drama",    rating: 8.6, poster: "https://placehold.co/200x300/1a1a2e/fff?text=Interstellar" },
  { id: 9,  title: "Fight Club",               year: 1999, genre: "Drama, Thriller",  rating: 8.8, poster: "https://placehold.co/200x300/1a1a2e/fff?text=Fight+Club"   },
  { id: 10, title: "Goodfellas",               year: 1990, genre: "Crime, Drama",     rating: 8.7, poster: "https://placehold.co/200x300/1a1a2e/fff?text=Goodfellas"   },
  { id: 1,  title: "Inception",                year: 2010, genre: "Sci-Fi, Thriller", rating: 8.8, poster: "https://placehold.co/200x300/1a1a2e/fff?text=Inception"    },
]

export const mockRecommendations = [
  { id: 3,  title: "Interstellar",    year: 2014, genre: "Sci-Fi, Drama",   rating: 8.6, score: 0.95, poster: "https://placehold.co/200x300/1a1a2e/fff?text=Interstellar" },
  { id: 2,  title: "The Dark Knight", year: 2008, genre: "Action, Crime",   rating: 9.0, score: 0.88, poster: "https://placehold.co/200x300/1a1a2e/fff?text=Dark+Knight"  },
  { id: 4,  title: "Parasite",        year: 2019, genre: "Thriller, Drama", rating: 8.5, score: 0.81, poster: "https://placehold.co/200x300/1a1a2e/fff?text=Parasite"     },
  { id: 9,  title: "Fight Club",      year: 1999, genre: "Drama, Thriller", rating: 8.8, score: 0.78, poster: "https://placehold.co/200x300/1a1a2e/fff?text=Fight+Club"   },
  { id: 7,  title: "The Godfather",   year: 1972, genre: "Crime, Drama",    rating: 9.2, score: 0.75, poster: "https://placehold.co/200x300/1a1a2e/fff?text=Godfather"    },
]

export const mockUser = {
  id: 1,
  username: "liana",
  email: "liana@example.com",
}
