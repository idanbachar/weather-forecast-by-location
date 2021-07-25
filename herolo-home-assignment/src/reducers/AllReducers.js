import { combineReducers } from "redux";
import FavoriteLocationsReducer from "./FavoriteLocationsReducer";
import ForcastUnitReducer from "./ForcastUnitReducer";

const AllReducers = combineReducers({
    favoriteLocations: FavoriteLocationsReducer,
    forcastUnit: ForcastUnitReducer
});

export default AllReducers;