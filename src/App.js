// import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js';
import Form from './components/Form.js';
import Footer from './components/Footer.js';
// import axios from 'axios';


// import { useEffect, useState } from 'react';


function App() {

  return (
    <div className="App">
      <div className="form-and-header">
        < Header />
        <Form />
      </div>
        <Footer />
    </div>
  );
}

export default App;
