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
import SearchResult from './components/SearchResult/SearchResult';
import Settings from './components/Profile/Settings/Settings';
import Profile from './components/Profile/Profile';
import RoolsUse from './components/Technicall/Rools/RoolsUse';
import ScrollUpButton from './components/Technicall/ScrollUp/ScrollUpButton';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AuthProvider } from './context/AuthContext';
import GuestGuard from './guards/GuestGuard';
import { CookiesProvider } from 'react-cookie';
import EmailConfirm from '../src/components/Technicall/Email/EmailConfirm';
import EmailChangeResult from './components/Technicall/Email/EmailChange/EmailChangeResult';
import ChangePassword from './components/Technicall/Password/ChangePassword/ChangePassword'
import ResetPassword from './components/Technicall/Password/ResetPassword';
import EmailWarning from './components/Technicall/Email/EmailWarning';
import SelectedFilms from './components/Selections/Selected/SelectedFilms';
import SelectedCartoons from './components/Selections/Selected/SelectedCartoons';
import SelectedSerials from './components/Selections/Selected/SelectedSerials';
import SelectedAnime from './components/Selections/Selected/SelectedAnime';

function App() {
  return (
    <>
      <CookiesProvider>
        <Provider store={store}>
          <AuthProvider>
            <Header />

            <Routes>
              <Route path='/' element={<MainPage />} />

              <Route path='/profile' element={<GuestGuard><Profile /></GuestGuard>} />
              <Route path='/settings/:option' element={<GuestGuard><Settings /></GuestGuard>} />

              <Route path='/search/:query?' element={<SearchResult />} />

              <Route path='/films/:genre?/:studio?/:date?/:popular?/:page' element={<FilmsPage />} />
              <Route path="/film-view/:genre/:id" element={<FilmView />} />

              <Route path='/cartoons/:category?/:animation?/:studio?/:date?/:popular?/:page' element={<CartoonsPage />} />
              <Route path="/cartoon-view/:category/:id" element={<CartoonView />} />

              <Route path='/serials/:genre?/:studio?/:date?/:popular?/:page' element={<SerialsPage />} />
              <Route path="/serial-view/:genre/:id" element={<SerialView />} />

              <Route path='/anime/:genre?/:date?/:popular?/:page' element={<AnimePage />} />
              <Route path="/anime-view/:genre/:id" element={<AnimeView />} /> 

              <Route path='/selections/:selection' element={<Selections />} />
              <Route path='/selection/films/:selected/:page' element={<SelectedFilms />} />
              <Route path='/selection/cartoons/:selected/:page' element={<SelectedCartoons />} />
              <Route path='/selection/serials/:selected/:page' element={<SelectedSerials />} />
              <Route path='/selection/anime/:selected/:page' element={<SelectedAnime />} />

              <Route path='/donate' element={<Donate />} />

              <Route path='/rools/:term' element={<RoolsUse />} />

              <Route path="/emailconfirm" element={<EmailConfirm />} />
              <Route path="/changeemail" element={<EmailChangeResult />} />
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/migrate" element={<EmailWarning />} />
              
              <Route path="*" element={<Status404 />} />
            </Routes>

            <ScrollUpButton />

            <Footer />
          </AuthProvider>  
        </Provider>
      </CookiesProvider>
    </>
  );
}

export default App;