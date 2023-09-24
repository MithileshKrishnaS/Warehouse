import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { Details } from './components/Details/Details';
import { Header } from './common/Header/Header';
function App() {
  return (
    <div className="app">
      <Header></Header>
      <div className='body'>
        <Router>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/detail/:id' element={<Details></Details>}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
