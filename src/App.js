import MainNavigation from "./components/MainNavigation/MainNavigation";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Books from "./components/Books/Books";
import Publishers from "./components/Publishers/Publishers";
import Authors from "./components/Authors/Authors";

function App() {
  return (
    <div>
      <MainNavigation />
      <Switch>
        <Route path="/" exact>
          <Home></Home>
        </Route>

        <Route path="/Books">
          <Books></Books>
        </Route>

        <Route path="/Publishers">
          <Publishers></Publishers>
        </Route>

        <Route path="/Authors">
          <Authors></Authors>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
