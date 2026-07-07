import {createContext, useState, useContext, useEffect} from "react"

const MovieContext = creatContext()

export const useMovieContext = () => useContext(MovieContext)

// If we wrap it around our app, it will provide context to the whole app
// like <App /> can get context from <BrowserRouter>
// Children is a reserved prop when you write a component and children is anything
// that is inside of the component that you rendered
// e.g. <BrowserRouter>
//          <App />
//      </BroswerRouter>
// Children is the App of BrowserRouter
export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")

        // Convert string list into an array e.g "[1, 2, 3]" -> [1, 2, 3]
        if (storedFavs) setFavorites(JSON.parse(storedFavs))
    }, [])

    // everytime favorites changes, we update the local storage
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    // 1. Add a favorite
    const addToFavorites = (movie) => {
        // ... means copying everything
        // prev means the previous/existing list of movies
        setFavorites(prev => [...prev, movie])
    }

    // 2. Remove from favorite
    const removeFromFavorites = (movieId) => {
        // .filter() create a new array that only keeps the items that pass a condition
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    // 3. Check favorite
    const isFavorite = (movieId) => {
        // .some() checks an array and returns either true or false
        return favorites.some(movie => movie.id === movieId)
    }

    // Values that we want to have global access
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    }

    // Return a wrapper function to put into App.jsx
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}