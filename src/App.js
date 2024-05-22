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
import Selections from './components/Selections/Selections';
import Status404 from './components/StatusComponents/Status404';
import Donate from './components/Donate/Donate';
import Selected from './components/Selections/Selected/Selected';
import SearchResult from './components/SearchResult/SearchResult';
import Settings from './components/Profile/Settings/Settings';
import Profile from './components/Profile/Profile';
import RoolsUse from './components/Technicall/Rools/RoolsUse';
import ScrollUpButton from './components/Technicall/ScrollUp/ScrollUpButton';
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />

        <Routes>
          <Route path='/' element={<MainPage />} />

          <Route path='/profile' element={<Profile />} />
          <Route path='/settings/:option' element={<Settings />} />

          <Route path='/search/:query?' element={<SearchResult />} />

          <Route path='/films/:genre?/:studio?/:date?/:popular?/:page' element={<FilmsPage />} />
          <Route path="/film-view/:genre/:id" element={<FilmView />} />

          <Route path='/cartoons/:category?/:date?/:popular?/:page' element={<CartoonsPage />} />
          <Route path="/cartoon-view/:genre/:id" element={<CartoonView />} />

          <Route path='/serials/:genre?/:date?/:popular?/:page' element={<SerialsPage />} />
          <Route path="/serial-view/:genre/:id" element={<SerialView />} />

          <Route path='/anime/:genre?/:date?/:popular?/:page' element={<AnimePage />} />
          <Route path="/anime-view/:genre/:id" element={<AnimeView />} /> 

          <Route path='/selections/:selection' element={<Selections />} />
          <Route path='/selection/:type/:selected/:page' element={<Selected />} />

          <Route path='/donate' element={<Donate />} />

          <Route path='/rools/:term' element={<RoolsUse />} />
          
          <Route path="*" element={<Status404 />} />
        </Routes>

        <ScrollUpButton />

        <Footer />
      </Provider>
    </>
  );
}

export default App;
