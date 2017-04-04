import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";

import workflow from "./workflow";

export default combineReducers({
    form: formReducer,
    workflow: workflow
});
