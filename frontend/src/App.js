import React, { useEffect } from 'react';
import { Route, Switch as RouterSwitch } from "react-router-dom";
import 'antd/dist/antd.css';

//IMPORT COMPONENTS
import Home from "./components/Home";
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Discover from './components/Discover';
import Community from './components/Community';
import Leaderboard from './components/Leaderboard';

import { Layout, Button, notification } from 'antd';
// import { useThemeSwitcher } from 'react-css-theme-switcher';

import { FireFilled } from "@ant-design/icons"

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken"

import PrivateRoute from "./components/Auth/PrivateRoute"

import Register from "./components/Auth/Register"
import Login from "./components/Auth/Login"
import Landing from "./components/Landing"

import { setCurrentUser, logoutUser, clearErrors } from './components/Auth/action';
import { store } from "./store"
import ComingSoon from './components/ComingSoon';
import Messages from './components/messages';
import { startConnection } from './utils/common';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentRoute } from './components/Navbar/actions';



// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  console.log("the main guyYYY")
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }


  //START SOCKET HERE..................
  store.dispatch(setCurrentRoute('home'))
  startConnection()


}

const App = (props) => {

  // const [isDarkMode, setIsDarkMode] = React.useState();
  // const { switcher, status, themes } = useThemeSwitcher();

  // const toggleTheme = (isChecked) => {
  //   setIsDarkMode(isChecked);
  //   switcher({ theme: isChecked ? themes.dark : themes.light });
  // };

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  useEffect(() => {
    if (props.errors?.message) {
      openNotificationWithIcon("error", props.errors.message)
      props.clearErrors()
    }
  }, [props.errors])


  // Avoid theme change flicker
  // if (status === "loading") {
  //   return null;
  // }


  return (
    <Layout>
      <Navbar />

      <RouterSwitch>
        <Route exact path='/' component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />

        <RouterSwitch>
          <PrivateRoute exact path='/home' component={Home} />
          <PrivateRoute exact path='/i/profile/:id' component={Profile} my={true} />
          <PrivateRoute exact path='/profile/:id' component={Profile} />
          <PrivateRoute exact path="/discover" component={Discover} />
          <PrivateRoute exact path="/messages" component={Messages} />
          <PrivateRoute exact path="/community" component={Community} />
          <PrivateRoute exact path="/leaderboard" component={Leaderboard} />
          <Route path="/" component={ComingSoon} />
        </RouterSwitch>
        {/* <Route path='/discover' component={Discover} /> */}
        {/*Put remaining routes here*/}
      </RouterSwitch>

      {/* <Button shape="circle" size="large" icon={
        // <FireTwoTone twoToneColor={isDarkMode?"yellow":"black"} 
        <FireFilled style={isDarkMode ? { "color": "#F0C315" } : { "color": "#444" }} />} style={{ "position": "fixed", "right": "16px", "bottom": "16px" }} onClick={() => toggleTheme(!isDarkMode)}></Button> */}

    </Layout>
  )
}

const mapStateToProps = state => ({
  errors: state.authReducer.errors
})

const mapDispatchToProps = dispatch => ({
  clearErrors: bindActionCreators(clearErrors, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

