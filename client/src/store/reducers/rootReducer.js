import { combineReducers } from "redux";
import notes from "./notes";
import toggle from "./toggle";

export default combineReducers({
    notes,
    toggle
});