
import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Cards from "./components/Cards";
import CardsDetail from './components/CardsDetail';
function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Cards/>}/>
        <Route path='/cart/:id' element={<CardsDetail/>}/>
      </Routes>
    </>
  );
}

export default App;
