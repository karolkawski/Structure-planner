import { FC } from 'react';
import Structure from './components/Structure/Structure';
import './App.css';
import Navigation from './components/Navigation/Navigation';

const App: FC = () => {
  return (
    <div id="App">
      <Navigation />
      <Structure />
    </div>
  );
};

export default App;
