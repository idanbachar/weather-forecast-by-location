
const FavoriteCitiesReducer = (state = [], action) => {

    switch (action.type) {
        case 'ADD':
            state.push(action.payload);
            return state;
        default:
            return state;
    }

};

export default FavoriteCitiesReducer;