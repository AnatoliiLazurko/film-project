import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import ViewPage from './components/ViewPage/ViewPage';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/home-page' element={<MainPage />} />
        <Route path="/film/:genre/:id" element={<ViewPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
