import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import GenrePage from './pages/GenrePage'
import HomePage from './pages/HomePage'
import WishlistPage from './pages/WishListPage'
import MediaDetailsPage from './pages/MediaDetailsPage'



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Forside der viser alle genrer */}
        <Route path="/" element={<HomePage />} />

        {/* Side der viser alle film i en bestemt genre */}
        <Route path="/genre/:genreId" element={<GenrePage />} />

        {/* Side der viser detaljer om en specifik film */}
        <Route path="/movie/:movieId" element={<MediaDetailsPage />} />

        {/* Side der viser brugerens ønskeliste */}
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </Router>
  );
};

export default App;