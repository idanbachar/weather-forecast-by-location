import { combineReducers } from "redux";
import FavoriteLocationsReducer from "./FavoriteLocationsReducer";
import ForcastUnitReducer from "./ForcastUnitReducer";
import ThemeReducer from "./ThemeReducer";

const AllReducers = combineReducers({
    favoriteLocations: FavoriteLocationsReducer,
    forcastUnit: ForcastUnitReducer,
    themeColor: ThemeReducer
});

export default AllReducers;