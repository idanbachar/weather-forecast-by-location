const initialState = [];

const FavoriteLocationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD":
            action.payload.isFavorite = true;
            state.push(action.payload);
            return state;
        case "REMOVE":
            state = state.filter(fav => fav.id !== action.payload);
            return state;
        default:
            return state;
    }
};

export default FavoriteLocationsReducer;