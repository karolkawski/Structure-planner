// App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Routing from './Routing/Routing';

const App = () => {
  return (
    <Router>
      <div id="App">
        <Navigation />
        <Routing />
      </div>
    </Router>
  );
};

export default App;
