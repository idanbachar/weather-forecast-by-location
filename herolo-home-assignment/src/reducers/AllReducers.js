import { combineReducers } from "redux";
import FavoriteCitiesReducer from "./FavoriteCitiesReducer";

const AllReducers = combineReducers({
    favoriteCities: FavoriteCitiesReducer
});

export default AllReducers;