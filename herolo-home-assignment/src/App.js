import './App.css';
import Navigation from './components/Navigation/Navigation';
import { Switch, Route } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {

  const title = "Herolo Weather Task";

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

      <Switch>
        <Route exact path="/" component={WeatherPage} />
        <Route exact path="/favorites" component={FavoritesPage} />
      </Switch>

    </div>
  );
}

export default App;
