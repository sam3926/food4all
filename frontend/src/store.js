import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools as compose } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


import homeReducer from "./components/Home/reducer";
import navReducer from "./components/Navbar/reducer"
//import all reducers here

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    homeReducer,
    navReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(
    persistedReducer,
    {},
    compose(applyMiddleware(thunk))
);

export const persistor = persistStore(store)
