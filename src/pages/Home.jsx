// Display different movies
// Has a search bar
import MovieCard from "../component/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

// Has almost every UI
function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    // Get movies but we don't want to fetch everytime user press search button
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // if something change in the array [] the useEffect function will run, otherwise it only runs once
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies(); // From API
                setMovies(popularMovies);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, []); // [] dependency array

    const handleSearch = async (e) => {
        e.preventDefault(); // Stop the page refresh and display the default value
        
        // We don't want "space" input from users
        if(!searchQuery.trim()) return
        if(loading) return

        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null) // Clear error
        } catch(err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }

        //setSearchQuery(""); // Clear the search box when pressed
    };

    return (
        <div className="home">
            {/* search bar - call handleSearch when Search button pressed*/}
            <form onSubmit={handleSearch} className="search-form">
                {/* search bar  */}
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {/* If loading, says loading else shows movie cards */}
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {/* .map() iterates through all movies then => passes the data to MovieCard func  */}
                    {/* key to give each component an unique identity so React can handle the state update  */}
                    {/* add key to the display function even if we haven't identified it as an object  */}
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
