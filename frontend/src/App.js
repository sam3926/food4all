import React from 'react';
import { Route, Switch as RouterSwitch } from "react-router-dom";
import 'antd/dist/antd.css';

//IMPORT COMPONENTS
import Home from "./components/Home";
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Discover from './components/Discover';
import { Layout, Button } from 'antd';
import { useThemeSwitcher } from 'react-css-theme-switcher';

import { FireFilled } from "@ant-design/icons"

const App = () => {

  const [isDarkMode, setIsDarkMode] = React.useState();
  const { switcher, status, themes } = useThemeSwitcher();

  const toggleTheme = (isChecked) => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  // Avoid theme change flicker
  if (status === "loading") {
    return null;
  }


  return (
    <Layout>
      <Navbar />

      <RouterSwitch>
        <Route exact path='/home' component={Home} />
        <Route path='/profile' component={Profile} />
        <Route path='/discover' component={Discover} />
        {/*Put remaining routes here*/}
      </RouterSwitch>

      <Button shape="circle" size="large" icon={
        // <FireTwoTone twoToneColor={isDarkMode?"yellow":"black"} 
        <FireFilled style={isDarkMode ? { "color": "#F0C315" } : { "color": "#444" }} />} style={{ "position": "fixed", "right": "16px", "bottom": "16px" }} onClick={() => toggleTheme(!isDarkMode)}></Button>

    </Layout>
  )
}

export default App;



