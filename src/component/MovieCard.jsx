// Work for every single movie
// Display information about that movie
import "../css/MovieCard.css"

function MovieCard({ movie }) {

    function onFavorite() {
        alert("clicked")
    }

    return (
        // A movie card has poster, overlay
        <div className="movie-card">
            <div className="movie-poster">
                {/* Take the image from movie url then display the alternative text using movie title */}
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    {/* Call a script when the fav-btn is hit */}
                    <button className="favorite-btn" onClick={onFavorite}>
                         🤍
                    </button>
                </div>
            </div>
            {/* A div for movie info */}
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    )
}

// Export the function out of this file
export default MovieCard