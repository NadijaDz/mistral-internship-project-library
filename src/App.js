
import MainNavigation from "./components/MainNavigation/MainNavigation";
import {Route,Switch} from 'react-router-dom'
import Home from "./components/Home/Home";
import Books from "./components/Books/Books";
import Publishers from "./components/Publishers/Publishers";





function App() {
  return (
    <div>
   
       <MainNavigation></MainNavigation> 
       
       <Switch>
        <Route path='/' exact>
          <Home></Home>
        </Route>
        
        <Route path='/Books'>
          <Books></Books>
        </Route>

        <Route path='/Publishers'>
          <Publishers></Publishers>
        </Route>

      </Switch> 
  


   

    

    </div>
  );
 
  
}

export default App;