import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import TVpage from './pages/TVpage';
import RestaurantPage from './pages/RestaurantPage';
import ExcursionsPage from './pages/ExcursionsPage';
import OneExcursionPage from './pages/OneExcursionPage';
import ServicePage from './pages/ServicePage';
import BasketPage from './pages/BasketPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';


function App() {

  return (
    <Routes>
      <Route path='/tv' element={<TVpage/>}/> 
      <Route path='/restaurant' element={<RestaurantPage/>}/> 
      <Route path='/excursions' element={<ExcursionsPage/>}/> 
      <Route path='/*' element={<NotFoundPage/>}/> 
      <Route path='/ex/:excursionsid' element={<OneExcursionPage/>}/> 
      <Route path='/service' element={<ServicePage/>}/> 
      <Route path='/basket' element={<BasketPage/>}/> 
      <Route path='/main' element={<MainPage/>}/>
      <Route path='/' element={<LoginPage/>}/>
    </Routes>
  );
}

export default App;
