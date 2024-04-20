import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import FilmViewPage from './components/FilmsComponents/FilmViewPage/FilmViewPage';
import FilmsPage from './components/FilmsComponents/FilmsPage/FilmsPage';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<MainPage />} />

        {/* <Route path='/films' element={<FilmsPage />} /> */}
        {/* <Route path='/films/:genre' element={<FilmsPage />} />
        <Route path='/films/:date' element={<FilmsPage />} /> */}
        <Route path='/films/:genre?/:date?/:popular?' element={<FilmsPage />} />
        <Route path="/film/:genre/:id" element={<FilmViewPage />} />
        
      </Routes>

      <Footer />
    </>
  );
}

export default App;
