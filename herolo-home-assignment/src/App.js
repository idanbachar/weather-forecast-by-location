
import './App.css';
import Navigation from './components/Navigation/Navigation';

function App() {

  const navLinks = [
    {
      label: "Home",
      to: "/"
    },
    {
      label: "Favorites",
      to: "/favorites"
    }
  ]


  return (
    <div className="App">
      <Navigation
        links={navLinks}
      />
    </div>
  );
}

export default App;
