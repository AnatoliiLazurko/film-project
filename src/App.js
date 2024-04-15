import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import FilmViewPage from './components/FilmsComponents/FilmViewPage/FilmViewPage';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/home-page' element={<MainPage />} />
        <Route path="/film/:genre/:id" element={<FilmViewPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
