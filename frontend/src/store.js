import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools as compose } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

import homeReducer from "./components/Home/reducer";
//import all reducers here


const store = createStore(
    combineReducers({
        homeReducer,
        //list down all the reducers
    }),
    {},
    compose(applyMiddleware(thunk))
);

export default store;
