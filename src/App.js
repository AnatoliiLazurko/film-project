import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import FilmsPage from './components/FilmsComponents/FilmsPage/FilmsPage';
import FilmView from './components/FilmsComponents/FilmViewPage/FilmView';
import CartoonsPage from './components/CartoonsComponents/CartoonsPage/CartoonsPage';
import CartoonView from './components/CartoonsComponents/CartoonViewPage/CartoonView';
import SerialsPage from './components/SerialsComponents/SerialsPage/SerialsPage';
import SerialView from './components/SerialsComponents/SerialViewPage/SerialView';
import AnimePage from './components/AnimeComponents/AnimePage/AnimePage';
import AnimeView from './components/AnimeComponents/AnimeViewPage/AnimeView';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<MainPage />} />

        <Route path='/films/:genre?/:date?/:popular?' element={<FilmsPage />} />
        <Route path="/film-view/:genre/:id" element={<FilmView />} />

        <Route path='/cartoons/:category?/:date?/:popular?' element={<CartoonsPage />} />
        <Route path="/cartoon-view/:genre/:id" element={<CartoonView />} />

        <Route path='/serials/:genre?/:date?/:popular?' element={<SerialsPage />} />
        <Route path="/serial-view/:genre/:id" element={<SerialView />} />

        <Route path='/anime/:genre?/:date?/:popular?' element={<AnimePage />} />
        <Route path="/anime-view/:genre/:id" element={<AnimeView />} /> 

        
      </Routes>

      <Footer />
    </>
  );
}

export default App;
