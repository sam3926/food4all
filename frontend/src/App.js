// import React from 'react';
// import { Route, Switch as RouterSwitch } from "react-router-dom";
// import 'antd/dist/antd.css';

// //IMPORT COMPONENTS
// import Home from "./components/Home";
// import Navbar from './components/Navbar';
// import Profile from './components/Profile';
// import Discover from './components/Discover';
// import { Layout, Button } from 'antd';
// import { useThemeSwitcher } from 'react-css-theme-switcher';

// import { FireFilled } from "@ant-design/icons"

// const App = () => {

//   const [isDarkMode, setIsDarkMode] = React.useState();
//   const { switcher, status, themes } = useThemeSwitcher();

//   const toggleTheme = (isChecked) => {
//     setIsDarkMode(isChecked);
//     switcher({ theme: isChecked ? themes.dark : themes.light });
//   };

//   // Avoid theme change flicker
//   if (status === "loading") {
//     return null;
//   }


//   return (
//     <Layout>
//       <Navbar />

//       <RouterSwitch>
//         <Route exact path='/home' component={Home} />
//         <Route path='/profile' component={Profile} />
//         <Route path='/discover' component={Discover} />
//         {/*Put remaining routes here*/}
//       </RouterSwitch>

//       <Button shape="circle" size="large" icon={
//         // <FireTwoTone twoToneColor={isDarkMode?"yellow":"black"} 
//         <FireFilled style={isDarkMode ? { "color": "#F0C315" } : { "color": "#444" }} />} style={{ "position": "fixed", "right": "16px", "bottom": "16px" }} onClick={() => toggleTheme(!isDarkMode)}></Button>

//     </Layout>
//   )


import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./components/Login/utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/Login/components/layout/Navbar";
import Landing from "./components/Login/components/layout/Landing";
import Register from "./components/Login/components/auth/Register";
import Login from "./components/Login/components/auth/Login";
import PrivateRoute from "./components/Login/components/private-route/PrivateRoute";
import Dashboard from "./components/Login/components/dashboard/Dashboard";
import App1 from "./App1";

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/App1" component={App1} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
