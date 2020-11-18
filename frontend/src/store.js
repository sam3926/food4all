import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools as compose } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


import homeReducer from "./components/Home/reducer";
import navReducer from "./components/Navbar/reducer";
import authReducer from "./components/Auth/reducer";
import HomeCenterReducer from './components/HomeCenter/reducer';
import LeftSidePanelReducer from './components/LeftSidePanel/reducer';
import DiscoverReducer from './components/Discover/reducer';
import ListReducer from './components/ListModal/reducer';
import profileReducer from "./components/Profile/reducer";
import messageReducer from "./components/messages/reducer";
import CommunityReducer from "./components/Community/reducer";
import LeaderboardReducer from "./components/Leaderboard/reducer";
//import all reducers here

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    homeReducer,
    navReducer,
    authReducer,
    HomeCenterReducer,
    DiscoverReducer,
    ListReducer,
    LeftSidePanelReducer,
    profileReducer,
    messageReducer,
    CommunityReducer,
    LeaderboardReducer,
    
});

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(
    persistedReducer,
    {},
    compose(applyMiddleware(thunk))
);

export const persistor = persistStore(store)
