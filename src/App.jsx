import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home"
import {Routes, Route} from "react-router-dom"
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./component/NavBar";


function App() {

    return (
        // Wrap inside MovieProvider for context
        // Children like Home, Favorites component can access to context
        <MovieProvider>
            {/* Display the navbar for all pages */}
            <NavBar />
            <main className="main-content">
                {/* Mapping routes */}
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/favorites" element={<Favorites />}/>
                </Routes>
            </main>
        </MovieProvider>
    )
}
 
export default App;
