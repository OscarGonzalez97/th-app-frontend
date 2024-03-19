import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/home';



import NavBarExample from './components/layouts/navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
         
          <Route path="/" element={<NavBarExample />}>
           
            <Route index element={<Home />} />
         
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
