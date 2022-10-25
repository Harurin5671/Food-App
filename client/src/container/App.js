import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../components/Home/Home.jsx";
import LandingPage from "../components/LandingPage/LandindPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path={"/"} render={() => <LandingPage />} />
        <Route path={"/home"} render={() => <Home />} />
      </div>
    </BrowserRouter>
  );
};

export default App;