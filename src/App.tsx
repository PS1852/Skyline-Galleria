import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './routes/Home';
import Directory from './routes/Directory';
import StoreDetails from './routes/StoreDetails';
import Events from './routes/Events';
import Parking from './routes/Parking';
import Account from './routes/Account';
import Contact from './routes/Contact';
import NotFound from './routes/NotFound';
import { AuthProvider } from './hooks/useAuth';
import { FavoritesProvider } from './hooks/useFavorites';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <FavoritesProvider>
          <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/directory/:id" element={<StoreDetails />} />
                <Route path="/events" element={<Events />} />
                <Route path="/parking" element={<Parking />} />
                <Route path="/account" element={<Account />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
