import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PostulanteForm from './PostulanteForm';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/postulanteform" element={<PostulanteForm />} />
      </Routes>
    </Router>
  );
}

export default App;
