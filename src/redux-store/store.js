import { createStore,combineReducers } from "redux";
import auth from "../reducer/auth";

const rootReducer=combineReducers({
    auth
});

const store=createStore(rootReducer);

export default store;