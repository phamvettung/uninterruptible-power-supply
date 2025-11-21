import { combineReducers } from "redux";
import authSlice from "./auth.slice";
import userSlice from "./user.slice";

const reducers = combineReducers({
    auth: authSlice,
    user: userSlice,
});
export default reducers;