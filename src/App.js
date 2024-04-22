import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import FilmsPage from './components/FilmsComponents/FilmsPage/FilmsPage';
import FilmView from './components/FilmsComponents/FilmViewPage/FilmView';
import CartoonsPage from './components/CartoonsComponents/CartoonsPage/CartoonsPage';
import CartoonView from './components/CartoonsComponents/CartoonViewPage/CartoonView';
import SeriesPage from './components/SeriesComponents/SeriesPage/SeriesPage';
import SerialView from './components/SeriesComponents/SerialViewPage/SerialView';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<MainPage />} />

        <Route path='/films/:genre?/:date?/:popular?' element={<FilmsPage />} />
        <Route path="/film/:genre/:id" element={<FilmView />} />

        <Route path='/cartoons/:category?/:date?/:popular?' element={<CartoonsPage />} />
        <Route path="/cartoon/:genre/:id" element={<CartoonView />} />

        <Route path='/serials/:genre?/:date?/:popular?' element={<SeriesPage />} />
        <Route path="/serial/:genre/:id" element={<SerialView />} />
        
      </Routes>

      <Footer />
    </>
  );
}

export default App;
