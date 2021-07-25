const initialState = 'C'

const ThemeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE':
            state = action.payload;
            return state;
        default:
            return state;
    }
};

export default ThemeReducer;