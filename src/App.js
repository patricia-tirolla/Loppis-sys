import { NavLink } from 'react-router';
import './App.css';

function App() {

  return (
    <div className="App">
      <h1>This is my app</h1>
      <nav>
        <NavLink to="/sellers">Go to sellers page</NavLink>
      </nav>
    </div>
  );
}

export default App;
