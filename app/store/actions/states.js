import * as axios from "axios";

export function loadStates() {
  return async function(dispatch) {
    let { data } = await axios.get("https://api.myjson.com/bins/bjf6p");
    dispatch({ type: "SET_STATES", payload: data.states });
  };
}
