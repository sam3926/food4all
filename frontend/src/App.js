import React from 'react';
import { Route, Switch as RouterSwitch } from "react-router-dom";
import 'antd/dist/antd.css';

//IMPORT COMPONENTS
import Home from "./components/Home";
import Navbar from './components/Navbar';

const App = () => {

  return (
    <div>
    <Navbar/>
    <RouterSwitch>
        <Route  exact path='/' component={Home} />
        {/*Put remaining routes here*/}
    </RouterSwitch>  
    </div>
  )
}

export default App;



