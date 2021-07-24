import { combineReducers } from "redux";
import FavoriteLocationsReducer from "./FavoriteLocationsReducer";

const AllReducers = combineReducers({
    favoriteLocations: FavoriteLocationsReducer
});

export default AllReducers;