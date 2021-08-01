import './App.css';
import Navigation from './components/Navigation/Navigation';
import { Switch, Route } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import FavoritesPage from './pages/FavoritesPage';
import TempUnitToggle from './components/TempUnitToggle/TempUnitToggle';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';

function App() {
  const title = "Weather Forecast By Location";

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Favorites", to: "/favorites" }
  ];

  return (
    <div className="App">
      <Navigation
        title={title}
        links={navLinks}
      />
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          flexDirection: "row"
        }}>
          <ThemeToggle />
          <TempUnitToggle />
        </div>
      </div>
      <Switch>
        <Route exact path="/" component={WeatherPage} />
        <Route exact path="/location/:locationId?" component={WeatherPage} />
        <Route exact path="/favorites" component={FavoritesPage} />
      </Switch>
    </div >
  );
}

export default App;
