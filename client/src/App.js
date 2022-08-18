import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import './App.css';
import PokemonCreate from './components/PokemonCreate';
import CardDetail from './components/CardDetail';

function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<LandingPage/>}/>
     <Route path='/home' element={<Home/>}/>
     <Route path='/create' element={<PokemonCreate/>}/>
     <Route path='/pokemonsDetail/:id' element={<CardDetail/>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
