import React, { useState } from 'react';
import { Route, Switch as RouterSwitch } from "react-router-dom";



//IMPORT COMPONENTS
import Home from "./components/Home";
import Navbar from './components/Navbar';

import { Switch } from 'antd';
import { useThemeSwitcher } from 'react-css-theme-switcher';


const App = () => {

  const [isDarkMode, setIsDarkMode] = React.useState();
  const { switcher, currentTheme, status, themes } = useThemeSwitcher();

  const toggleTheme = (isChecked) => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  // Avoid theme change flicker
  if (status === "loading") {
    return null;
  }


  return (
    <div>
      <Navbar />
      <Switch checked={isDarkMode} onChange={toggleTheme} />

      <RouterSwitch>
        <Route path="/home">
          <Home />
        </Route>
        {/*Put remaining routes here*/}
      </RouterSwitch>

    </div>
  )
}

export default App;
