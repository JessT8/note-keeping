import { combineReducers } from "redux";
import notes from "./notes";
import toggle from "./toggle";
import user from "./user";

export default combineReducers({
    notes,
    toggle,
    user
});