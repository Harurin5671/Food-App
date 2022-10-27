import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../components/Home/Home.jsx";
import LandingPage from "../components/LandingPage/LandindPage.jsx";
import CreateRecipe from '../components/CreateRecipe/CreateRecipe';
import Detail from '../components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path={"/"} render={() => <LandingPage />} />
        <Route path={"/home"} render={() => <Home />} />
        <Route path={"/create"} render={() => <CreateRecipe />} />
        <Route path={"/recipes/:id"} render={() => <Detail />} />
      </div>
    </BrowserRouter>
  );
};

export default App;